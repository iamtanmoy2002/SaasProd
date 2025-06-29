'use client';
import { Home, Music, ShoppingBag, Tag, Ticket, Podcast, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", icon: <Home size={22} />, label: "Home" },
  { href: "/library", icon: <Music size={22} />, label: "Music Library" },
  { href: "/marketplace", icon: <ShoppingBag size={22} />, label: "Marketplace" },
  { href: "/pricing", icon: <Tag size={22} />, label: "Pricing" },
  { href: "/tickets", icon: <Ticket size={22} />, label: "Book Ticket" },
  { href: "/podcasts", icon: <Podcast size={22} />, label: "Podcasts" },
  { href: "/blog", icon: <BookOpen size={22} />, label: "Blog" },
];

export default function Sidebar() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <aside className="fixed top-24 left-2 z-50 flex flex-col items-center bg-zinc-900 rounded-2xl shadow-xl py-6 px-2 w-16 gap-6 h-[72vh] min-h-[350px] max-h-[90vh] transition-all duration-300 overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        {/* Placeholder SVG logo */}
        <div className="w-8 h-8 mb-1 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="4" height="16" rx="2" fill="#f97316" />
            <rect x="12" y="4" width="4" height="24" rx="2" fill="#fff" />
            <rect x="20" y="10" width="4" height="12" rx="2" fill="#f97316" />
          </svg>
        </div>
        <span className="text-white font-bold text-xs tracking-wide">Groovyy</span>
      </div>
      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-3 w-full">
        {navItems.map((item, idx) => (
          <div key={item.href} className="relative flex items-center justify-center w-full">
            <Link
              href={item.href}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${hovered === idx ? "bg-orange-500/20 text-orange-500" : "text-white hover:text-orange-500 hover:bg-orange-500/10"}`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.icon}
            </Link>
            {/* Tooltip */}
            {hovered === idx && (
              <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-zinc-800 text-white px-3 py-1 rounded-md shadow text-xs whitespace-nowrap z-50 border border-zinc-700 animate-fade-in">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

// Hide scrollbar utility
// Add this to your global CSS if not present:
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } 