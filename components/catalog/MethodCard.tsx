import Link from "next/link";
import { Coffee, Cylinder, Filter, Flame, GlassWater } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metodo } from "@/lib/types";

/* Mapa explícito: o dado traz o nome do ícone, o bundle só carrega estes cinco. */
const ICONES: Record<string, LucideIcon> = {
  coffee: Coffee,
  cylinder: Cylinder,
  "glass-water": GlassWater,
  filter: Filter,
  flame: Flame,
};

export function MethodCard({ metodo }: { metodo: Metodo }) {
  const Icone = ICONES[metodo.icone] ?? Coffee;

  return (
    <article className="cl-catalog-card">
      <div className="cl-card-head">
        <Icone aria-hidden="true" />
        <span className="cl-tag">{metodo.nivel}</span>
      </div>

      <h2>{metodo.nome}</h2>
      <p>{metodo.descricao}</p>

      <div className="cl-card-meta">
        {metodo.tempo} · {metodo.moagem}
      </div>

      <Link className="cl-card-action" href={`/?metodo=${metodo.id}`}>
        Preparar com {metodo.nome}
      </Link>
    </article>
  );
}
