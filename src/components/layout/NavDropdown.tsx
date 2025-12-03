'use client';

import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items: Array<{ label: string; href: string }>;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  navItemStyles: string;
  navSurfaceStyles: string;
}

export default function NavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  navItemStyles,
  navSurfaceStyles,
}: NavDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onToggle]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        className={`flex items-center gap-2 text-sm font-medium ${navItemStyles}`}
        style={{ transition: 'color 5ms ease-in-out' }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Invisible bridge to keep menu open */}
      <div className="absolute left-0 right-0 h-8 top-full" />

      <div
        className={`absolute left-0 top-full z-50 mt-8 w-56 rounded-2xl border p-3 shadow-2xl transition-opacity transition-transform duration-200 ease-in-out ${navSurfaceStyles} ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`block rounded-xl px-4 py-2 text-sm font-medium transition-colors ${navItemStyles}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}