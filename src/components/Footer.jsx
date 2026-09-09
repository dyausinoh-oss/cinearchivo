export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-800 bg-base-900/60 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-lg font-black tracking-tight text-white">
            Cine<span className="text-accent">Archivo</span>
          </span>
          <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
            Catálogo de tráilers oficiales, documentales de dominio público y
            material de archivo independiente.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">Legal</h3>
          <ul className="space-y-2 text-xs text-zinc-500">
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Aviso Legal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Términos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Licencias de Contenido
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">Soporte</h3>
          <ul className="space-y-2 text-xs text-zinc-500">
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Reportar un Problema
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">Derechos de Autor</h3>
          <ul className="space-y-2 text-xs text-zinc-500">
            <li>
              <a href="#" className="hover:text-accent transition-colors">
                Remoción DMCA
              </a>
            </li>
            <li className="text-zinc-600">
              Todo el contenido mostrado es de dominio público o bajo
              licencia Creative Commons.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-800 py-5">
        <p className="text-center text-xs text-zinc-600">
          © {year} CineArchivo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
