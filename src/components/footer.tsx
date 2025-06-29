import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-800 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-white text-sm">
          &copy; {currentYear} <span className="font-bold"><span className="text-orange-500">G</span><span className="text-orange-500">r</span><span className="text-white">oo</span><span className="text-orange-500">vyy</span></span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
