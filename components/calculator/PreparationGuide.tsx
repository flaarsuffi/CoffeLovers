"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Metodo } from "@/lib/types";

interface Props {
  metodo: Metodo;
  aberto: boolean;
  onFechar: () => void;
}

export function PreparationGuide({ metodo, aberto, onFechar }: Props) {
  const tituloRef = useRef<HTMLHeadingElement>(null);

  // Ao abrir, leva o foco para o início do guia — ele aparece abaixo do botão
  // que o acionou e o leitor de tela precisa acompanhar.
  useEffect(() => {
    if (aberto) tituloRef.current?.focus();
  }, [aberto]);

  if (!aberto) return null;

  return (
    <section id="cl-guide" className="cl-guide" aria-labelledby="cl-guide-title">
      <div className="cl-guide-title">
        <div>
          <div className="cl-kicker">Um passo de cada vez</div>
          <h2 id="cl-guide-title" ref={tituloRef} tabIndex={-1}>
            Prepare seu {metodo.nome}
          </h2>
        </div>
        <button
          type="button"
          className="cl-close"
          aria-label="Fechar passo a passo"
          onClick={onFechar}
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <ol>
        {metodo.passos.map((passo) => (
          <li key={passo.titulo}>
            <strong>{passo.titulo}</strong>
            {passo.descricao}
          </li>
        ))}
      </ol>
    </section>
  );
}
