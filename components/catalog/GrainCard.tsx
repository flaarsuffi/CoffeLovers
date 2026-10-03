import Link from "next/link";
import { Bean } from "lucide-react";
import type { Grao } from "@/lib/types";

export function GrainCard({ grao }: { grao: Grao }) {
  return (
    <article className="cl-catalog-card">
      <div className="cl-card-head">
        <Bean aria-hidden="true" />
        <span className="cl-tag">
          {grao.tipo === "especie" ? "Espécie" : "Variedade"}
        </span>
      </div>

      <h2>{grao.nome}</h2>
      <p>
        {grao.perfil}
        <br />
        {grao.notas.join(" · ")}
      </p>

      <div className="cl-card-meta">{grao.corpo}</div>

      <Link className="cl-card-action" href={`/graos/${grao.id}`}>
        Conhecer {grao.nome} →
      </Link>
    </article>
  );
}
