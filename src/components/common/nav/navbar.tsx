"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { BookmarkIcon, Menu } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "../theme-toggle"
import NavLogo from "./nav-logo"

import { NAV_BUTTON, NAV_LINKS } from "@/lib/constants/nav-links"
import MobileMenu from "./mobile-menu"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-4 py-1">
      <div className="flex items-center gap-4">
        <NavLogo />

        <nav className="hidden items-center space-x-4 md:flex">
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

      <nav className="flex items-center space-x-4">
        <div className="hidden items-center space-x-4 md:flex">
          <SignedIn>
            {NAV_BUTTON.map((button, index) => (
              <Button
                key={button.href}
                asChild
                variant={index === 0 ? "default" : "outline"}
                size="sm"
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            ))}
          </SignedIn>

          <SignedIn>
            <Button variant="outline" size="icon">
              <Link href="/blog/bookmarks">
                <BookmarkIcon />
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant={"secondary"} size={"sm"}>
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        <ThemeToggle />

        <SignedIn>
          <UserButton />
        </SignedIn>

        <Button
          onClick={() => setIsOpen(true)}
          variant={"secondary"}
          size={"icon"}
          className="md:hidden"
        >
          <Menu className="size-9" />
        </Button>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
