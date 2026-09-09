"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { getGenreList } from "@/lib/genres";

const GENRE_LIST = getGenreList();

function GenreDropdown({ selectedGenre, onGenreChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeName = GENRE_LIST.find((g) => g.id === selectedGenre)?.name;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 transition-colors ${
          activeName ? "text-accent font-semibold" : "text-zinc-400 hover:text-white"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 sm:hidden">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M7 12h10M11 19h2" />
        </svg>
        <span className="hidden sm:inline">{activeName ?? "Géneros"}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed left-4 right-4 top-24 z-50 grid grid-cols-2 gap-0.5
                     rounded-xl border border-base-700 bg-base-800 p-3 shadow-2xl
                     sm:absolute sm:left-0 sm:right-auto sm:top-[calc(100%+14px)] sm:w-[340px]"
        >
          <button
            type="button"
            onClick={() => {
              onGenreChange(null);
              setOpen(false);
            }}
            className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              selectedGenre === null
                ? "bg-accent/15 text-accent"
                : "text-zinc-300 hover:bg-accent/15 hover:text-white"
            }`}
          >
            Todas
          </button>
          {GENRE_LIST.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={() => {
                onGenreChange(genre.id);
                setOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                selectedGenre === genre.id
                  ? "bg-accent/15 text-accent"
                  : "text-zinc-300 hover:bg-accent/15 hover:text-white"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ searchTerm, onSearchChange, selectedGenre, onGenreChange }) {
  return (
    <header className="sticky top-0 z-50 bg-base-950/90 backdrop-blur border-b border-base-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-black tracking-tight text-white">
            Cine<span className="text-accent">Archivo</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <span className="hover:text-white transition-colors cursor-default">
            Documentales
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            Archivo
          </span>
        </nav>

        <div className="text-sm">
          <GenreDropdown selectedGenre={selectedGenre} onGenreChange={onGenreChange} />
        </div>

        <div className="ml-auto">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
}
