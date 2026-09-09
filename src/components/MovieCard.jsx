"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const HOVER_DELAY_MS = 350;

export default function MovieCard({ movie }) {
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    timerRef.current = setTimeout(() => setExpanded(true), HOVER_DELAY_MS);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setExpanded(false);
  };

  return (
    <Link
      href={`/pelicula/${movie.id}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative block rounded-lg bg-base-800 border transition-all duration-300 ease-out origin-top
                  ${
                    expanded
                      ? "scale-110 z-30 border-accent shadow-[0_20px_50px_-10px_rgba(37,99,235,0.6)]"
                      : "border-base-700 hover:border-accent hover:scale-105 hover:z-20 hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.55)]"
                  }`}
    >
      {/* Portada */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg bg-base-900">
        <img
          src={movie.posterUrl}
          alt={movie.titulo}
          className="w-full h-full object-cover"
        />

        {/* Overlay oscuro + icono Play al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="h-14 w-14 rounded-full bg-accent/90 flex items-center justify-center
                       scale-75 group-hover:scale-100 transition-transform duration-300 shadow-glow"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-white translate-x-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Puntuación */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold text-yellow-400">
          ★ {movie.puntuacion}
        </div>
      </div>

      {/* Info base */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate">{movie.titulo}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">{movie.anio}</p>
      </div>

      {/* Panel expandido tipo Netflix: aparece tras un breve hover */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out
                     ${expanded ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-3 pb-3">
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {movie.sinopsis}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-black translate-x-px">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="h-7 w-7 shrink-0 rounded-full border border-zinc-500 flex items-center justify-center text-zinc-300 text-xs font-semibold">
              i
            </span>
            <span className="ml-auto text-[10px] text-zinc-500 truncate">
              {movie.categoria}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
