// Capa de acceso a The Movie Database (TMDb) API.
// Toda esta lógica corre en el servidor (Server Components / route handlers),
// así que la API key nunca se expone al bundle del cliente.

import { GENRES } from "./genres";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";
const DOCUMENTARY_GENRE_ID = 99;

export class TmdbError extends Error {
  constructor(message, { code, status } = {}) {
    super(message);
    this.name = "TmdbError";
    this.code = code;
    this.status = status;
  }
}

function assertApiKey() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new TmdbError(
      "Falta configurar TMDB_API_KEY en tu archivo .env.local.",
      { code: "MISSING_API_KEY" }
    );
  }
  return apiKey;
}

async function tmdbFetch(path, searchParams = {}) {
  const apiKey = assertApiKey();

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "es-ES");
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url.toString(), {
    // ISR: refresca los datos de TMDb cada hora sin necesidad de rebuild.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new TmdbError(`Error TMDb (${res.status}) en ${path}`, {
      code: "TMDB_ERROR",
      status: res.status,
    });
  }

  return res.json();
}

export function posterUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function backdropUrl(path, size = "w1280") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function providerLogoUrl(path, size = "w92") {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

const FALLBACK_POSTER = "https://placehold.co/400x600/111114/f4f4f5?text=Sin+Portada";

// Convierte un resultado "crudo" de TMDb a la forma que consumen
// nuestros componentes (MovieCard, MovieRow, Banner, MovieGrid...).
export function mapTmdbMovie(m) {
  const generoIds = m.genres ? m.genres.map((g) => g.id) : m.genre_ids ?? [];
  const genreNames = generoIds.map((id) => GENRES[id]).filter(Boolean);

  return {
    id: m.id,
    titulo: m.title || m.original_title || "Sin título",
    anio: m.release_date ? m.release_date.slice(0, 4) : "—",
    puntuacion: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 0,
    posterUrl: posterUrl(m.poster_path) ?? FALLBACK_POSTER,
    backdropUrl: backdropUrl(m.backdrop_path) ?? posterUrl(m.poster_path) ?? FALLBACK_POSTER,
    sinopsis: m.overview || "Sinopsis no disponible.",
    categoria: genreNames.length > 0 ? genreNames.join(", ") : "Sin categoría",
    generoIds,
  };
}

export async function getPopularMovies(page = 1) {
  const data = await tmdbFetch("/movie/popular", { page });
  return data.results;
}

export async function getNowPlayingMovies(page = 1) {
  const region = process.env.TMDB_REGION || "MX";
  const data = await tmdbFetch("/movie/now_playing", { page, region });
  return data.results;
}

export async function getTopRatedMovies(page = 1) {
  const data = await tmdbFetch("/movie/top_rated", { page });
  return data.results;
}

export async function getDocumentaries(page = 1) {
  const data = await tmdbFetch("/discover/movie", {
    with_genres: DOCUMENTARY_GENRE_ID,
    sort_by: "popularity.desc",
    page,
  });
  return data.results;
}

export async function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}

const TRAILER_TYPE_LABELS = {
  Trailer: "Tráiler Oficial",
  Teaser: "Adelanto",
  Featurette: "Detrás de Cámaras",
  Clip: "Escena",
};

export async function getMovieVideos(id) {
  const data = await tmdbFetch(`/movie/${id}/videos`);
  return data.results
    .filter((v) => v.site === "YouTube" && TRAILER_TYPE_LABELS[v.type])
    .map((v) => ({
      label: TRAILER_TYPE_LABELS[v.type] ?? v.name,
      youtubeId: v.key,
    }));
}

// "Dónde verla" legalmente. TMDb obtiene estos datos de JustWatch,
// por lo que hay que atribuir la fuente al mostrarlos en pantalla.
export async function getWatchProviders(id) {
  const region = process.env.TMDB_REGION || "MX";
  const data = await tmdbFetch(`/movie/${id}/watch/providers`);
  return data.results?.[region] ?? null;
}
