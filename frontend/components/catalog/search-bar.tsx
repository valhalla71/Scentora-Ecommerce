"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div
      className={cn(
        "relative w-full",
        "flex items-center gap-2",
        "rounded-lg border border-border/60",
        "bg-background",
        "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30",
        "transition-all",
      )}
    >
      <Search
        className={cn(
          "size-4 shrink-0",
          "ps-3 text-muted-foreground",
        )}
        aria-hidden="true"
      />

      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className={cn(
          "flex-1 bg-transparent",
          "py-2 pe-2 text-base",
          "placeholder:text-muted-foreground",
          "outline-none",
        )}
        aria-label={placeholder}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            "pe-3 text-muted-foreground",
            "hover:text-foreground",
            "transition-colors",
          )}
        >
          <X className="size-4 shrink-0" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
