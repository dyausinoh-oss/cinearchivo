export default function ApiKeyNotice() {
  return (
    <div className="max-w-2xl mx-auto my-16 rounded-xl border border-dashed border-accent/60 bg-base-900/60 p-8 text-center">
      <h2 className="text-white text-lg font-bold mb-2">
        Falta configurar tu API key de TMDb
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-5">
        CineArchivo obtiene pósters, sinopsis, tráilers y disponibilidad legal
        en tiempo real desde{" "}
        <span className="text-zinc-300 font-medium">The Movie Database (TMDb)</span>.
        Crea una cuenta gratuita, genera tu API key y pégala en{" "}
        <code className="text-accent">.env.local</code> como{" "}
        <code className="text-accent">TMDB_API_KEY</code>.
      </p>
      <a
        href="https://www.themoviedb.org/settings/api"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover
                   text-white font-semibold px-5 py-2.5 rounded-md transition-colors shadow-glow"
      >
        Obtener API key en TMDb →
      </a>
      <p className="text-zinc-600 text-xs mt-5">
        Después de guardar la clave en <code>.env.local</code>, reinicia{" "}
        <code>npm run dev</code>.
      </p>
    </div>
  );
}
