import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getMovieDetails,
  getMovieVideos,
  getWatchProviders,
  mapTmdbMovie,
} from "@/lib/tmdb";
import PlayerTabs from "@/components/PlayerTabs";
import WatchProviders from "@/components/WatchProviders";
import AdSlot from "@/components/AdSlot";
import ApiKeyNotice from "@/components/ApiKeyNotice";

export const revalidate = 3600;

function DetailHeader() {
  return (
    <header className="border-b border-base-800 bg-base-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Cine<span className="text-accent">Archivo</span>
        </Link>
        <Link
          href="/"
          className="ml-auto text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </div>
    </header>
  );
}

export default async function MovieDetailPage({ params }) {
  let movieRaw, videos, providers;

  try {
    [movieRaw, videos, providers] = await Promise.all([
      getMovieDetails(params.id),
      getMovieVideos(params.id),
      getWatchProviders(params.id),
    ]);
  } catch (e) {
    if (e.code === "MISSING_API_KEY") {
      return (
        <>
          <DetailHeader />
          <ApiKeyNotice />
        </>
      );
    }
    if (e.status === 404) {
      notFound();
    }
    throw e;
  }

  const movie = mapTmdbMovie(movieRaw);

  return (
    <>
      <DetailHeader />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 h-72 overflow-hidden -z-10">
          <img
            src={movie.backdropUrl}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">
            {movie.categoria}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {movie.titulo}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
            <span>{movie.anio}</span>
            <span className="text-yellow-400 font-semibold">★ {movie.puntuacion}</span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Columna principal: reproductor + info + ad horizontal */}
          <div className="flex-1 min-w-0">
            <PlayerTabs videos={videos} title={movie.titulo} movieId={movie.id} />

            {/* Banner horizontal debajo del reproductor */}
            <div className="mt-4">
              <AdSlot orientation="horizontal" />
            </div>

            <div className="mt-6">
              <h2 className="text-white font-semibold mb-2">Sinopsis</h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-3xl">
                {movie.sinopsis}
              </p>
            </div>

            <WatchProviders providers={providers} title={movie.titulo} />
          </div>

          {/* Columna lateral: solo visible en escritorio */}
          <aside className="lg:pt-1">
            <AdSlot orientation="vertical" />
          </aside>
        </div>
      </main>
    </>
  );
}
