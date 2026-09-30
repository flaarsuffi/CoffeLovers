import { getMetodoById, getAllMetodoIds } from "@/lib/data";
import { OptimizedImage } from "@/components/OptimizedImage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllMetodoIds();
}

export default function MetodoDetailPage({ params }: { params: { id: string } }) {
  const metodo = getMetodoById(params.id);

  if (!metodo) {
    notFound();
  }

  return (
    <>
      {/* BREADCRUMB */}
      <div className="px-20 py-4 text-xs text-text-tertiary letter-spacing-wide">
        <a href="/" className="text-primary">Home</a> / <a href="/metodos" className="text-primary">Métodos</a> / {metodo.nome}
      </div>

      {/* HERO */}
      <section className="grid grid-cols-[1.2fr_1fr] gap-15 px-20 py-20 items-center">
        <div>
          <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-6">
            {metodo.nome}
          </div>
          <h1 className="font-serif text-6xl font-bold mb-4 letter-spacing-tight">
            {metodo.tagline}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8 font-light">
            {metodo.descricao}
          </p>
          <div className="flex gap-6 mb-8 text-sm">
            <div>
              <span className="text-text-tertiary">Tempo:</span>
              <div className="text-primary font-bold">{metodo.tempo_minutos}-{metodo.tempo_minutos + 1} min</div>
            </div>
            <div>
              <span className="text-text-tertiary">Dificuldade:</span>
              <div className="text-primary font-bold">{metodo.dificuldade}</div>
            </div>
            <div>
              <span className="text-text-tertiary">Investimento:</span>
              <div className="text-primary font-bold">{metodo.investimento}</div>
            </div>
          </div>
          <a
            href="/metodos"
            className="inline-block bg-transparent text-primary px-6 py-3 border-2 border-primary rounded-pill font-semibold cursor-pointer transition-all hover:bg-primary hover:text-dark hover:translate-y-[-2px] text-xs letter-spacing-wide"
          >
            ← Explorar métodos
          </a>
        </div>
      </section>

      {/* IMAGEM SECTION */}
      <section className="px-20 py-12 flex justify-center">
        <OptimizedImage
          src={`/assets/images/metodos/${metodo.id}.png`}
          alt={metodo.nome}
          width={400}
          height={400}
          priority={true}
          className="w-96 h-96"
        />
      </section>

      {/* TUTORIAL SECTION */}
      <section className="px-20 py-20">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Como Preparar
        </h2>
        <div className="space-y-6">
          {metodo.tutorial.passos.map((passo) => (
            <div key={passo.numero} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="font-serif text-3xl font-bold text-primary w-12 h-12 flex items-center justify-center">
                  {passo.numero}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold mb-2">{passo.titulo}</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-3">{passo.descricao}</p>
                <div className="px-3 py-2 bg-opacity-50 rounded text-sm text-text-tertiary italic">
                  💡 {passo.dica}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TÉCNICAS SECTION */}
      <section className="px-20 py-20">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Técnicas Essenciais
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="px-5 py-4 bg-bg-subtle rounded-md border border-border">
            <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
              Temperatura
            </div>
            <div className="text-base text-white font-medium">{metodo.tecnicas.temperatura}</div>
          </div>
          <div className="px-5 py-4 bg-bg-subtle rounded-md border border-border">
            <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
              Tempo
            </div>
            <div className="text-base text-white font-medium">{metodo.tecnicas.tempo}</div>
          </div>
          <div className="px-5 py-4 bg-bg-subtle rounded-md border border-border">
            <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
              Proporção
            </div>
            <div className="text-base text-white font-medium">{metodo.tecnicas.proporcao}</div>
          </div>
          <div className="px-5 py-4 bg-bg-subtle rounded-md border border-border">
            <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
              Granulometria
            </div>
            <div className="text-base text-white font-medium">{metodo.tecnicas.granulometria}</div>
          </div>
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="px-20 py-20">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Por Que Escolher Este Método
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4">Por que vale a pena</h3>
            <ul className="space-y-2">
              {metodo.pros.map((pro, idx) => (
                <li key={idx} className="text-sm text-text-secondary flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-4">O que você vai enfrentar</h3>
            <ul className="space-y-2">
              {metodo.cons.map((con, idx) => (
                <li key={idx} className="text-sm text-text-secondary flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
