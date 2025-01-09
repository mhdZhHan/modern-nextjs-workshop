import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { X, BookmarkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAV_BUTTON, NAV_LINKS } from "@/lib/constants/nav-links"

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: MobileMenuProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-background px-9 py-4 shadow-lg transition-all duration-300 ease-in-out",
          {
            "translate-y-0": isOpen,
            "translate-y-full": !isOpen,
          }
        )}
      >
        <Button
          onClick={onClose}
          variant={"secondary"}
          size={"icon"}
          className="absolute right-4 top-4 size-6 rounded-md"
        >
          <X className="size-4 font-bold" />
        </Button>

        <nav className="mt-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex w-full items-center justify-start gap-2 py-1 text-sm",
                {
                  "text-foreground": pathname === link.href,
                  "text-foreground/60": pathname !== link.href,
                }
              )}
            >
              <link.icon size={16} />

              {link.text}
            </Link>
          ))}

          <SignedIn>
            {NAV_BUTTON.map((button) => (
              <Button
                key={button.href}
                onClick={() => handleNavigation(button.href)}
                variant={"outline"}
                size={"sm"}
                className="w-full justify-start"
              >
                {button.text}
              </Button>
            ))}

            <Button
              variant="outline"
              size={"sm"}
              className="w-full justify-start"
              onClick={() => handleNavigation("/blog/bookmarks")}
            >
              <BookmarkIcon className="mr-2 h-5 w-5" />
              Bookmarks
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant={"default"} size={"sm"} className="w-full">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </>
  )
}
