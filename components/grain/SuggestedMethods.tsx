import Link from "next/link";
import { getMetodo } from "@/lib/data";
import type { Grao } from "@/lib/types";

export function SuggestedMethods({ grao }: { grao: Grao }) {
  const metodos = grao.metodosSugeridos
    .map(getMetodo)
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  return (
    <aside className="cl-grain-aside">
      <div className="cl-kicker">Da leitura ao preparo</div>
      <h2>Experimente na prática.</h2>
      <p>Escolha um método para levar este grão à sua receita.</p>

      <div className="cl-grain-methods">
        {metodos.map((metodo) => (
          <Link
            key={metodo.id}
            href={`/?metodo=${metodo.id}&grao=${grao.id}`}
          >
            <span>{metodo.nome}</span>
            <small>{metodo.tempo} →</small>
          </Link>
        ))}
      </div>

      <p className="cl-aside-note">
        A calculadora mantém o grão escolhido. Ajuste o volume e a intensidade
        ao seu gosto.
      </p>
    </aside>
  );
}
