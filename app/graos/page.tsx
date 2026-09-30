import { graos } from "@/lib/data";

export default function GraosPage() {
  return (
    <section className="px-20 py-15">
      <h1 className="font-serif text-5xl font-bold mb-8 letter-spacing-tight">
        Nossas Variedades
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {graos.map((grao) => (
          <a
            key={grao.id}
            href={`/graos/${grao.id}`}
            className="bg-bg-subtle px-7 py-7 rounded-md border border-border cursor-pointer transition-all text-center hover:bg-opacity-10 hover:border-border-accent hover:translate-y-[-4px] hover:shadow-md"
          >
            <div className="text-5xl mb-3">🫘</div>
            <h3 className="font-serif text-lg font-bold text-primary mb-2">
              {grao.nome}
            </h3>
            <p className="text-sm text-text-tertiary leading-normal">
              {grao.flavor.descricao}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
