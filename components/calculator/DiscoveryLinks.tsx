import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bean, Coffee } from "lucide-react";

const DESTINOS = [
  {
    href: "/graos",
    Icone: Bean,
    titulo: "Encontre seu grão",
    texto: "Sabores, origens e novas descobertas.",
  },
  {
    href: "/metodos",
    Icone: Coffee,
    titulo: "Escolha seu método",
    texto: "Um preparo que combina com seu ritmo.",
  },
] as const;

export function DiscoveryLinks() {
  return (
    <section className="cl-explore" aria-labelledby="cl-explore-title">
      <div className="cl-explore-heading">
        <h2 id="cl-explore-title">Conheça seu café.</h2>
        <Link className="cl-text-button" href="/metodos">
          Explorar <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <div className="cl-discovery-grid">
        {DESTINOS.map(({ href, Icone, titulo, texto }) => (
          <Link key={href} className="cl-discovery" href={href}>
            <span className="cl-discovery-icon">
              <Icone aria-hidden="true" />
            </span>
            <span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </span>
            <ArrowUpRight className="cl-arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
