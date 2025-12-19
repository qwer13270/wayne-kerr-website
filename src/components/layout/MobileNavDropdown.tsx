"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface MobileNavDropdownProps {
  label: string;
  items: Array<{ label: string; href: string }>;
  isOpen: boolean;
  onToggle: () => void;
  textColor: string;
}

export default function MobileNavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  textColor,
}: MobileNavDropdownProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full py-2 ${textColor} hover:text-blue-600 font-medium`}
      >
        {label}
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="pl-4 pt-2 space-y-2">
          {items.map((item) => {
            const isExternal =
              item.href.startsWith("http://") ||
              item.href.startsWith("https://");
            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`block py-2 text-sm ${textColor} hover:text-blue-600`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
