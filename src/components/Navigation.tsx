"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/danslessen", label: "Danslessen" },
  { href: "/evenementen", label: "Events" },
];

const DESKTOP_MIN_WIDTH = 768;

export default function Navigation() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const isOpen = menuHeight > 0;

  const closeMenu = () => setMenuHeight(0);
  const toggleMenu = () =>
    setMenuHeight(isOpen ? 0 : (menuRef.current?.scrollHeight ?? 0));

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setMenuHeight(0);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-neutral-800 px-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-title uppercase text-white hover:text-primary transition-colors"
          >
            Salsera Cubana
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            id="hamburger"
            type="button"
            className={clsx(
              "md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded",
              isOpen && "active",
            )}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuHeight }}
        aria-hidden={!isOpen}
      >
        <div className="px-page py-4 space-y-2 border-t border-neutral-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
