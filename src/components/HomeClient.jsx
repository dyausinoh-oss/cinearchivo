"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import MovieGrid from "@/components/MovieGrid";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import ApiKeyNotice from "@/components/ApiKeyNotice";
import { GENRES } from "@/lib/genres";

export default function HomeClient({ sectionsData, featured, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const isSearching = searchTerm.trim().length > 0;
  const isFiltering = isSearching || selectedGenre !== null;

  const allMovies = useMemo(() => {
    const byId = new Map();
    sectionsData.forEach((section) =>
      section.movies.forEach((movie) => byId.set(movie.id, movie))
    );
    return Array.from(byId.values());
  }, [sectionsData]);

  const filteredMovies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allMovies.filter((m) => {
      const matchesTerm = !term || m.titulo.toLowerCase().includes(term);
      const matchesGenre = selectedGenre === null || (m.generoIds ?? []).includes(selectedGenre);
      return matchesTerm && matchesGenre;
    });
  }, [searchTerm, selectedGenre, allMovies]);

  const heading =
    !isSearching && selectedGenre !== null ? GENRES[selectedGenre] : "Resultados de búsqueda";

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {error ? (
        <ApiKeyNotice />
      ) : (
        <>
          <Banner movie={featured} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            {isFiltering ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg sm:text-xl font-bold text-white">{heading}</h2>
                  <span className="text-xs text-zinc-500">
                    {filteredMovies.length} título{filteredMovies.length !== 1 && "s"}
                  </span>
                </div>
                <MovieGrid movies={filteredMovies} />
              </>
            ) : (
              sectionsData.map((section) => (
                <MovieRow key={section.key} title={section.label} movies={section.movies} />
              ))
            )}
          </main>
        </>
      )}

      <Footer />
    </>
  );
}
