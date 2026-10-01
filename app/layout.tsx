import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoffeLovers — Premium Coffee Enthusiasts",
  description: "Explore premium coffee beans and brewing methods. Learn the art and science of specialty coffee.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark text-white font-sans">
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-sticky bg-dark/90 backdrop-blur-md border-b border-border px-20 py-6">
      <a href="/" className="font-serif text-xl font-bold letter-spacing-3 text-primary inline-block hover:text-primary">
        COFFEELOVERS
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-transparent text-text-tertiary text-xs px-20 py-12 text-center">
      <p>© 2026 CoffeLovers — Premium Coffee Enthusiasts</p>
      <div className="mt-4 space-x-3">
        <a href="/graos" className="text-primary hover:underline">
          Grãos
        </a>
        <a href="/metodos" className="text-primary hover:underline">
          Métodos
        </a>
      </div>
    </footer>
  );
}
