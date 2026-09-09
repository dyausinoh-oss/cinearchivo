import { providerLogoUrl } from "@/lib/tmdb";

function ProviderGroup({ label, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-xs text-zinc-500 mb-2">{label}</p>
      <div className="flex flex-wrap gap-3">
        {items.map((p) => (
          <div
            key={p.provider_id}
            title={p.provider_name}
            className="h-12 w-12 rounded-lg overflow-hidden border border-base-700 bg-base-800
                       hover:border-accent transition-colors"
          >
            <img
              src={providerLogoUrl(p.logo_path)}
              alt={p.provider_name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WatchProviders({ providers, title }) {
  // Sección eliminada por petición: no renderizamos opciones de proveedores.
  return null;
}
