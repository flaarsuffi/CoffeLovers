import type { Grao } from "@/lib/types";

/* Os três passos são o método de prova sugerido pelo produto, iguais para
   todos os grãos — não vêm do conteúdo de cada variedade. */
const PASSOS_DEGUSTACAO = [
  {
    numero: "01",
    titulo: "Perceba o aroma",
    texto: "Aproxime a xícara e tente reconhecer uma primeira nota.",
  },
  {
    numero: "02",
    titulo: "Sinta a textura",
    texto: "Observe se a bebida parece delicada ou mais encorpada.",
  },
  {
    numero: "03",
    titulo: "Compare os goles",
    texto:
      "Volte à xícara quando ela estiver menos quente e perceba o que mudou.",
  },
];

export function GrainEditorial({ grao }: { grao: Grao }) {
  return (
    <div className="cl-editorial">
      <section aria-labelledby="cl-origin-heading">
        <h2 id="cl-origin-heading">Origem &amp; história</h2>
        <p>{grao.historia}</p>
        <div className="cl-source">
          Para aprofundar:{" "}
          <a href={grao.fonte.url} target="_blank" rel="noopener noreferrer">
            {grao.fonte.publicacao}
          </a>
        </div>
      </section>

      <section aria-labelledby="cl-tasting-heading">
        <h2 id="cl-tasting-heading">Como degustar</h2>
        <p>{grao.degustacao}</p>
        <div className="cl-tasting">
          {PASSOS_DEGUSTACAO.map(({ numero, titulo, texto }) => (
            <div key={numero}>
              <span>{numero}</span>
              <strong>{titulo}</strong>
              {texto}
            </div>
          ))}
        </div>
      </section>

      <details open>
        <summary>Altitude e região de cultivo</summary>
        <p>{grao.cultivo}</p>
      </details>

      <details>
        <summary>Torra, moagem e preparo</summary>
        <p>{grao.preparo}</p>
      </details>

      <details>
        <summary>Harmonizações para experimentar</summary>
        <p>{grao.harmonizacao}</p>
      </details>

      <details>
        <summary>Cafeína e informações do lote</summary>
        <p>
          Fazenda, região, altitude, processo e data da torra ajudam a conhecer
          o café que está na sua mão. Procure essas informações na embalagem ou
          com a torrefação. O nome da variedade, sozinho, não informa a
          quantidade de cafeína na sua xícara.
        </p>
      </details>
    </div>
  );
}
