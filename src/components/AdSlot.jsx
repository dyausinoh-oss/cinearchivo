export default function AdSlot({ orientation = "horizontal" }) {
  const isVertical = orientation === "vertical";

  return (
    // Espacio Publicitario Reservado.
    // Zona pensada para banners nativos (ej. 728x90 horizontal / 300x600 vertical).
    <div
      className={
        isVertical
          ? "hidden lg:flex w-[300px] h-[600px] shrink-0 items-center justify-center rounded-lg border border-dashed border-base-700 bg-base-900/50 text-zinc-600 text-xs"
          : "w-full h-24 sm:h-28 flex items-center justify-center rounded-lg border border-dashed border-base-700 bg-base-900/50 text-zinc-600 text-xs"
      }
    >
      Espacio Publicitario Reservado
    </div>
  );
}
