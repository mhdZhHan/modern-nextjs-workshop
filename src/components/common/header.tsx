"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookmarkIcon, Feather, House } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import NavLogo from "./nav-logo"

const NAV_LINKS = [
  { href: "/", text: "Home", icon: House },
  { href: "/blog", text: "Blogs", icon: Feather },
]

const BUTTONS = [
  { href: "/dashboard/posts", text: "Dashboard" },
  { href: "/write", text: "Write" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-4 py-1">
      <div className="flex items-center gap-4">
        <NavLogo />

        <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 text-sm hover:text-foreground/80 ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              <link.icon className="h-4 w-4" />

              {link.text}
            </Link>
          ))}
        </nav>
      </div>

      <nav className="mt-4 flex w-full items-center space-x-4 md:mt-0 md:w-auto">
        {BUTTONS.map((button, index) => (
          <Button
            key={button.href}
            asChild
            variant={index === 0 ? "default" : "outline"}
            size="sm"
          >
            <Link href={button.href}>{button.text}</Link>
          </Button>
        ))}

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <Button variant="outline" size="icon">
            <Link href={"/blog/bookmarks"}>
              <BookmarkIcon />
            </Link>
          </Button>
        </SignedIn>

        <ThemeToggle />

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  )
}
