import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 px-1">{title}</h2>

      <div
        className="flex items-start gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6
                   snap-x snap-mandatory scroll-smooth"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0 w-[42vw] sm:w-[190px] md:w-[200px] snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
