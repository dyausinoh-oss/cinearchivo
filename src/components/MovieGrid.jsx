import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  if (movies.length === 0) {
    return (
      <p className="text-zinc-500 text-sm py-16 text-center">
        No se encontraron títulos con estos filtros.
      </p>
    );
  }

  return (
    <div
      className="grid gap-4 sm:gap-5 items-start
                 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
