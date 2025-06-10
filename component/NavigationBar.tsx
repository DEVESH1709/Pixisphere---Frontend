"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Pixisphere
        </Link>

        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/photographers">Photographers</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

    
        <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

   
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-gray-700 font-medium shadow-md border-t">
          {[
            { href: "/", label: "Home" },
            { href: "/photographers", label: "Photographers" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 px-2 hover:bg-gray-100 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
