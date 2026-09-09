import "./globals.css";

export const metadata = {
  title: "CineArchivo | Tráilers, documentales y cine independiente",
  description:
    "Catálogo de tráilers oficiales, documentales de dominio público y material de archivo independiente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-base-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
