import { graos, metodos } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="grid grid-cols-[1.2fr_1fr] gap-15 px-20 py-20 border-b border-border items-center">
        <div>
          <h1 className="font-serif text-6xl font-bold mb-4 letter-spacing-tight">
            Café Premium Discoverer
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-8 font-light">
            Explore as melhores variedades de café do Brasil e do mundo. Aprenda técnicas de preparo, descubra perfis de sabor únicos e eleve sua experiência cafetera.
          </p>
          <a
            href="#graos"
            className="inline-block bg-transparent text-primary px-7 py-3 border-2 border-primary rounded-pill font-semibold cursor-pointer transition-all hover:bg-primary hover:text-dark hover:translate-y-[-2px] text-sm letter-spacing-wide"
          >
            Explorar Grãos
          </a>
        </div>
        <div className="text-9xl text-right drop-shadow-lg">☕</div>
      </section>

      {/* GRÃOS SECTION */}
      <section id="graos" className="px-20 py-15 border-b border-border">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Nossas Variedades
          <div className="w-10 h-0.5 bg-primary mt-4"></div>
        </h2>
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

      {/* MÉTODOS SECTION */}
      <section id="metodos" className="px-20 py-15 border-b border-border">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Métodos de Preparo
          <div className="w-10 h-0.5 bg-primary mt-4"></div>
        </h2>
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

      {/* QUIZ SECTION */}
      <section id="quiz" className="px-20 py-15">
        <div className="bg-bg-subtle px-15 py-10 rounded-lg border border-border text-center max-w-2xl mx-auto">
          <h3 className="font-serif text-3xl font-bold text-primary mb-4">
            Qual é o seu café ideal?
          </h3>
          <p className="text-base text-text-secondary leading-relaxed mb-6">
            Responda algumas perguntas e descubra qual grão e método combinam melhor com seu paladar e rotina.
          </p>
          <button className="inline-block bg-transparent text-primary px-7 py-3 border-2 border-primary rounded-pill font-semibold cursor-pointer transition-all hover:bg-primary hover:text-dark hover:translate-y-[-2px] text-sm letter-spacing-wide">
            Começar Quiz
          </button>
        </div>
      </section>
    </>
  );
}
