// Datos de demostración para desarrollo local sin necesidad de TMDB_API_KEY.
// Usa los cortometrajes "open movie" de Blender Foundation (licencia Creative
// Commons) y sus subidas oficiales a YouTube, así que son seguros de embeber.
//
// Cada película sigue la misma forma que mapTmdbMovie() en src/lib/tmdb.js
// (id, titulo, anio, posterUrl, sinopsis) para poder usarse como reemplazo
// directo de los datos reales de TMDb en las mismas vistas.

const FALLBACK_POSTER = (titulo) =>
  `https://placehold.co/400x600/111114/f4f4f5?text=${encodeURIComponent(titulo)}`;

export const MOVIES = [
  {
    id: "big-buck-bunny",
    titulo: "Big Buck Bunny",
    anio: "2008",
    sinopsis:
      "Un conejo gigante y bondadoso se venga de tres roedores acosadores en este clásico cortometraje de animación de Blender Foundation.",
    posterUrl: FALLBACK_POSTER("Big Buck Bunny"),
    videos: [
      { label: "Película Completa", youtubeId: "aqz-KE-bpKQ" },
      { label: "Tráiler Oficial", youtubeId: "GJVwbyAY4Sk" },
    ],
  },
  {
    id: "sintel",
    titulo: "Sintel",
    anio: "2010",
    sinopsis:
      "Una joven llamada Sintel busca a un pequeño dragón al que crió y perdió, en el tercer cortometraje abierto de Blender Foundation.",
    posterUrl: FALLBACK_POSTER("Sintel"),
    videos: [
      { label: "Película Completa", youtubeId: "eRsGyueVLvQ" },
      { label: "Tráiler Oficial", youtubeId: "KC4r2lm8kr8" },
      { label: "Detrás de Cámaras", youtubeId: "IN6w6GnN-Ic" },
    ],
  },
  {
    id: "tears-of-steel",
    titulo: "Tears of Steel",
    anio: "2012",
    sinopsis:
      "Un grupo de guerreros e ingenieros se reúne en Ámsterdam para enfrentar a un ejército de robots, en el cortometraje de efectos visuales de Blender Foundation.",
    posterUrl: FALLBACK_POSTER("Tears of Steel"),
    videos: [
      { label: "Película Completa", youtubeId: "R6MlUcmOul8" },
      { label: "Detrás de Cámaras", youtubeId: "nawbpZOKpD8" },
    ],
  },
  {
    id: "elephants-dream",
    titulo: "Elephants Dream",
    anio: "2006",
    sinopsis:
      "Dos personajes exploran una extraña máquina onírica en el primer cortometraje abierto producido por Blender Foundation.",
    posterUrl: FALLBACK_POSTER("Elephants Dream"),
    videos: [{ label: "Película Completa", youtubeId: "TLkA0RELQ1g" }],
  },
];

export function getMovieById(id) {
  return MOVIES.find((m) => m.id === id) ?? null;
}
