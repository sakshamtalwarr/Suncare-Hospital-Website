"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export function SiteHeader() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Suncare Hospital</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/about" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/services" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Services
                </Link>
                <Link
                  href="/team"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/team" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Our Team
                </Link>
                <Link
                  href="/gallery"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/gallery" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Gallery
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/blog" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/contact" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Contact
                </Link>
                <div className="mt-4 flex items-center gap-4">
                  <ThemeToggle />
                  <Button asChild className="w-full">
                    <a
                      href="https://wa.me/919876543210?text=I%20would%20like%20to%20book%20an%20appointment%20at%20Suncare%20Hospital"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book an Appointment
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/about" ? "text-primary" : "text-muted-foreground",
                )}
              >
                About
              </Link>
              <Link
                href="/services"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/services" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Services
              </Link>
              <Link
                href="/team"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/team" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Our Team
              </Link>
              <Link
                href="/gallery"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/gallery" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/blog" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/contact" ? "text-primary" : "text-muted-foreground",
                )}
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild>
                <a
                  href="https://wa.me/919876543210?text=I%20would%20like%20to%20book%20an%20appointment%20at%20Suncare%20Hospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  /* 
                    WhatsApp redirect link for appointment booking
                    - Uses the hospital's official WhatsApp number: +91 98765 43210
                    - Pre-filled message for appointment request
                    - Opens in new tab for better user experience
                  */
                >
                  Book an Appointment
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

