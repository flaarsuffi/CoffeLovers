import { metodos } from "@/lib/data";

export default function MetodosPage() {
  return (
    <section className="px-20 py-15">
      <h1 className="font-serif text-5xl font-bold mb-8 letter-spacing-tight">
        Métodos de Preparo
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {metodos.map((metodo) => (
          <a
            key={metodo.id}
            href={`/metodos/${metodo.id}`}
            className="bg-bg-subtle px-7 py-7 rounded-md border border-border cursor-pointer transition-all text-center hover:bg-opacity-10 hover:border-border-accent hover:translate-y-[-4px] hover:shadow-md"
          >
            <div className="text-5xl mb-3">{metodo.icone}</div>
            <h3 className="font-serif text-lg font-bold text-primary mb-2">
              {metodo.nome}
            </h3>
            <p className="text-sm text-text-tertiary leading-normal">
              {metodo.tagline}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
