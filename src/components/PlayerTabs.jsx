"use client";

import { useState } from "react";

// Dominio de privacidad extendida de YouTube: no deja cookies de rastreo
// hasta que el usuario le da play al video.
// Normalizamos el id y usamos el embed de YouTube (youtube-nocookie) como
// fuente fiable para mostrar el vídeo específico.
const VIDSRC_BASE = "https://vidsrc.sbs/"; // preservado como referencia
const YT_EMBED_BASE = "https://www.youtube-nocookie.com/embed/";

export default function PlayerTabs({ videos, title, movieId }) {
  const validVideos = (videos ?? []).filter((v) => v.youtubeId);
  const [activeIndex, setActiveIndex] = useState(0);

  if (validVideos.length === 0) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg border border-base-800 flex items-center justify-center">
        <p className="text-zinc-500 text-sm px-6 text-center">
          No hay video disponible para este título todavía.
        </p>
      </div>
    );
  }

  const activeVideo = validVideos[activeIndex] ?? validVideos[0];

  // Normaliza distintos formatos posibles de identificador de YouTube
  function normalizeYoutubeId(id) {
    if (!id) return "";
    // Si nos pasan una URL completa, extraer el id
    try {
      const u = new URL(id);
      if (u.hostname.includes("youtube.com")) {
        return u.searchParams.get("v") || "";
      }
      if (u.hostname === "youtu.be") {
        return u.pathname.slice(1);
      }
    } catch (e) {
      // no es una URL, seguir
    }
    // Si vino en formato short (youtu.be/ID) o ya es el id
    const parts = id.split(/\//).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : id;
  }

  const ytId = normalizeYoutubeId(activeVideo.youtubeId);

  // Si tenemos el TMDb/movie id, usamos el embed directo de vidsrc.sbs:
  // https://vidsrc.sbs/embed/movie/{movieId}
  const vidsrcEmbedByMovie = movieId ? `${VIDSRC_BASE}embed/movie/${movieId}` : null;

  // Construye la URL directa de vidsrc para el vídeo si tenemos el YouTube ID.
  // Formato (fallback): https://vidsrc.sbs/{youtubeId}
  const vidsrcVideoUrl = ytId ? `${VIDSRC_BASE}${ytId}` : null;

  // Si no hay ytId, pero tenemos título, hacemos una búsqueda en vidsrc.
  const vidsrcSearch = title
    ? `${VIDSRC_BASE}search?q=${encodeURIComponent(title)}`
    : VIDSRC_BASE;

  // Prioridad de fuentes:
  // 1) vidsrc embed por `movieId` (/embed/movie/{id})
  // 2) vidsrc página de vídeo por `youtubeId` (/{youtubeId})
  // 3) vidsrc búsqueda por `title`
  // 4) embed de YouTube (privacy-enhanced)
  const src = vidsrcEmbedByMovie || vidsrcVideoUrl || vidsrcSearch || (ytId ? `${YT_EMBED_BASE}${encodeURIComponent(ytId)}` : VIDSRC_BASE);

  return (
    <div className="w-full">
      {/* Contenedor negro gigante del reproductor */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-base-800 shadow-2xl">
        <iframe
          key={title ?? activeVideo.youtubeId} // fuerza recarga limpia al cambiar de pestaña
          src={src}
          title={`Reproductor - ${activeVideo.label}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Enlace alternativo por si Vidsrc bloquea el embedding */}
      {(vidsrcEmbedByMovie || vidsrcVideoUrl || title) && (
        <div className="mt-2 text-sm">
          <a
            href={vidsrcEmbedByMovie || vidsrcVideoUrl || vidsrcSearch}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Abrir en Vidsrc.sbs
          </a>
        </div>
      )}

      {/* Pestañas de video */}
      {validVideos.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {validVideos.map((video, index) => (
            <button
              key={video.youtubeId}
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors
                ${
                  index === activeIndex
                    ? "bg-accent border-accent text-white shadow-glow"
                    : "bg-base-800 border-base-700 text-zinc-400 hover:text-white hover:border-accent"
                }`}
            >
              {video.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
