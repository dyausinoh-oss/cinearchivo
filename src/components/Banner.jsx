import Link from "next/link";

export default function Banner({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative w-full h-[62vh] min-h-[420px] overflow-hidden">
      {/* Backdrop a todo el ancho */}
      <img
        src={movie.backdropUrl ?? movie.posterUrl}
        alt={movie.titulo}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Degradado hacia abajo (para que el footer del hero se funda con la página) */}
      <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/40 to-transparent" />
      {/* Degradado hacia la izquierda (para legibilidad del texto) */}
      <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/50 to-transparent" />
      {/* Viñeta superior sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-950/70 via-transparent to-transparent" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12">
        <span className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
          ▲ Destacado
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white max-w-2xl leading-tight drop-shadow-lg">
          {movie.titulo}
        </h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-zinc-300">
          <span className="text-yellow-400 font-semibold">★ {movie.puntuacion}</span>
          <span>{movie.anio}</span>
          <span className="hidden sm:inline text-zinc-500">·</span>
          <span className="hidden sm:inline text-zinc-400">{movie.categoria}</span>
        </div>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-zinc-300 line-clamp-3">
          {movie.sinopsis}
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href={`/pelicula/${movie.id}`}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover
                       text-white font-semibold px-6 py-3 rounded-md transition-colors shadow-glow"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver ahora
          </Link>
          <Link
            href={`/pelicula/${movie.id}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                       backdrop-blur border border-white/20 text-white font-semibold
                       px-6 py-3 rounded-md transition-colors"
          >
            Más información
          </Link>
        </div>
      </div>
    </section>
  );
}
