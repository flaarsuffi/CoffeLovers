import Link from "next/link";
import { variedades } from "@/lib/data";
import { GrainCard } from "@/components/catalog/GrainCard";

export default function GraosPage() {
  return (
    <>
      <div className="cl-catalog-intro">
        <div className="cl-kicker">Comece pela curiosidade</div>
        <h1>
          Conheça o que vai
          <br />
          <em>na sua xícara.</em>
        </h1>
        <p>
          Explore sabores, origens e histórias. Cada grão tem uma página para
          você conhecer mais.
        </p>
      </div>

      <div className="cl-catalog-grid">
        {variedades.map((grao) => (
          <GrainCard key={grao.id} grao={grao} />
        ))}
      </div>

      <div className="cl-knowledge-note">
        <strong>Espécie e variedade: qual a diferença?</strong>
        <br />
        Arábica é uma espécie. Bourbon, Catuaí e outras variedades ajudam a
        contar sua diversidade.{" "}
        <Link href="/graos/arabica">
          Conheça o Arábica <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}
