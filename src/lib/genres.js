// Mapa estático de géneros de películas de TMDb (id -> nombre en español).
// Es la lista pública y estable que expone /genre/movie/list.
// Vive fuera de tmdb.js para poder importarse desde componentes de cliente
// (el Navbar) sin arrastrar la lógica de fetch/API key del servidor.
export const GENRES = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "Película de TV",
  53: "Suspenso",
  10752: "Bélica",
  37: "Western",
};

export function getGenreList() {
  return Object.entries(GENRES)
    .map(([id, name]) => ({ id: Number(id), name }))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
