import HomeClient from "@/components/HomeClient";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getDocumentaries,
  getTopRatedMovies,
  mapTmdbMovie,
} from "@/lib/tmdb";

export const revalidate = 3600;

export default async function HomePage() {
  let sectionsData = [];
  let error = null;

  try {
    const [popular, nowPlaying, documentaries, topRated] = await Promise.all([
      getPopularMovies(),
      getNowPlayingMovies(),
      getDocumentaries(),
      getTopRatedMovies(),
    ]);

    sectionsData = [
      { key: "tendencias", label: "Tendencias", movies: popular.map(mapTmdbMovie) },
      {
        key: "ultimos-lanzamientos",
        label: "Últimos lanzamientos",
        movies: nowPlaying.map(mapTmdbMovie),
      },
      { key: "documentales", label: "Documentales", movies: documentaries.map(mapTmdbMovie) },
      { key: "mejor-valoradas", label: "Mejor valoradas", movies: topRated.map(mapTmdbMovie) },
    ];
  } catch (e) {
    error = e.message;
  }

  const featured = sectionsData[0]?.movies?.[0] ?? null;

  return <HomeClient sectionsData={sectionsData} featured={featured} error={error} />;
}
