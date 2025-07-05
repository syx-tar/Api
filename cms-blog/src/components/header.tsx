'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Personal Blog
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth section */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                Contact
              </Link>
              {session ? (
                <>
                  <Link href="/admin" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                    Admin
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}