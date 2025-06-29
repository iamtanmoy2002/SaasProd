'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { createClient } from "../../supabase/client";

const navLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/library", label: "Music Library" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/blog", label: "Blog" },
  { href: "/podcasts", label: "Podcast" },
  { href: "/tickets", label: "Book Ticket" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as any);
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-800 bg-black py-2">
      <div className="w-full flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="4" height="16" rx="2" fill="#f97316" />
              <rect x="12" y="4" width="4" height="24" rx="2" fill="#fff" />
              <rect x="20" y="10" width="4" height="12" rx="2" fill="#f97316" />
            </svg>
          </span>
          <Link href={user ? "/dashboard" : "/"} prefetch className="text-xl font-bold">
            <span className="text-orange-500">G</span><span className="text-orange-500">r</span><span className="text-white">oo</span><span className="text-orange-500">vyy</span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.label === "Home" ? (user ? "/dashboard" : "/") : link.href}
              className="px-3 py-2 text-sm font-medium text-white hover:text-orange-500 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right: Auth/User */}
        <div className="flex gap-2 items-center">
          {/* Global Search Bar */}
          <div className="hidden md:flex items-center bg-zinc-900 rounded-lg px-2 py-1 mr-2">
            <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
            <input
              type="text"
              placeholder="Search music, artists..."
              className="bg-transparent outline-none border-none text-white placeholder-gray-400 text-sm w-48"
            />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-white hover:text-orange-500 p-2 rounded"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          {/* Auth/User buttons (desktop only) */}
          {user ? (
            <UserProfile />
          ) : (
            <div className="hidden md:flex gap-2 items-center">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-black bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-black/95 z-50 flex flex-col items-center justify-start pt-8 gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.label === "Home" ? (user ? "/dashboard" : "/") : link.href}
              className="px-6 py-3 text-lg font-medium text-white hover:text-orange-500 rounded transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? null : (
            <div className="flex gap-4 mt-4">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-white hover:text-orange-500"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-black bg-orange-500 rounded-md hover:bg-orange-600"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
