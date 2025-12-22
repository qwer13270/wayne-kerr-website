"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxWidth?: string;
  showResultsCount?: boolean;
  resultsCount?: number;
  resultsLabel?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  maxWidth = "600px",
  showResultsCount = false,
  resultsCount = 0,
  resultsLabel = "",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <div className={`relative mx-auto`} style={{ maxWidth }}>
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary"
          size={20}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ backgroundColor: "hsl(var(--bg-secondary))" }}
          className="w-full pl-14 pr-5 py-4 rounded-4xl text-primary focus:outline-none focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-blue-400/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
        />
      </div>
      {showResultsCount && resultsCount > 0 && (
        <div className="mt-4 text-sm text-secondary">
          {resultsLabel || `Showing ${resultsCount} results`}
        </div>
      )}
    </div>
  );
}
