"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar títulos..."
        className="w-full rounded-full bg-base-800/80 border border-base-700 pl-9 pr-4 py-2 text-sm
                   text-zinc-100 placeholder-zinc-500 outline-none
                   focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
      />
    </div>
  );
}
