import Link from "next/link";
import { ArrowUpRight, Bean } from "lucide-react";
import type { Grao } from "@/lib/types";

export function GrainHero({ grao }: { grao: Grao }) {
  return (
    <div className="cl-grain-hero">
      <div>
        <div className="cl-kicker">
          {grao.tipo === "especie" ? "Conheça a espécie" : "Conheça a variedade"}
        </div>
        <h1 id="cl-detail-name">{grao.nome}</h1>
        <div className="cl-grain-lead">{grao.perfil}</div>

        <div className="cl-flavors">
          {grao.notas.map((nota) => (
            <span key={nota}>{nota}</span>
          ))}
        </div>

        <Link className="cl-grain-cta" href={`/?grao=${grao.id}`}>
          <span>Preparar com {grao.nome}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <section className="cl-sensory" aria-labelledby="cl-sensory-title">
        <div className="cl-sensory-top">
          <Bean aria-hidden="true" />
          Perfil na xícara
        </div>
        <h2 id="cl-sensory-title">O que procurar ao provar</h2>
        <p>{grao.sensorial}</p>
        <p
          style={{
            borderTop: "1px solid #ffffff25",
            paddingTop: 12,
            marginTop: 14,
            fontSize: 11,
          }}
        >
          As notas são referências para explorar. O lote, a torra e o preparo
          também contam.
        </p>
      </section>
    </div>
  );
}
