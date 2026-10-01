import { getGraoById, getAllGraoIds } from "@/lib/data";
import { OptimizedImage } from "@/components/OptimizedImage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllGraoIds();
}

export default function GraoDetailPage({ params }: { params: { id: string } }) {
  const grao = getGraoById(params.id);

  if (!grao) {
    notFound();
  }

  return (
    <>
      {/* BREADCRUMB */}
      <div className="px-20 py-4 text-xs text-text-tertiary letter-spacing-wide">
        <a href="/" className="text-primary">Home</a> / <a href="/graos" className="text-primary">Grãos</a> / {grao.nome}
      </div>

      {/* HERO */}
      <section className="grid grid-cols-[1.2fr_1fr] gap-15 px-20 py-20 items-center relative z-0">
        <div>
          <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-6">
            {grao.nome}
          </div>
          <h1 className="font-serif text-6xl font-bold mb-4 letter-spacing-tight">
            {grao.flavor.descricao}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-8 font-light">
            {grao.origin}
          </p>
          <a
            href="/graos"
            className="inline-block bg-transparent text-primary px-6 py-3 border-2 border-primary rounded-pill font-semibold cursor-pointer transition-all hover:bg-primary hover:text-dark hover:translate-y-[-2px] text-xs letter-spacing-wide"
          >
            ← Explorar grãos
          </a>
        </div>
        <div className="flex justify-end relative z-0">
          <OptimizedImage
            src={`/assets/images/graos/${grao.id}.png`}
            alt={grao.nome}
            width={300}
            height={300}
            priority={true}
            className="w-64 h-64"
          />
        </div>
      </section>

      {/* ORIGEM SECTION */}
      <section className="px-20 py-24">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Origem
        </h2>
        <div className="grid grid-cols-[1.4fr_1fr] gap-15">
          <div className="text-base text-text-tertiary leading-relaxed font-light">
            <p className="mb-4">{grao.origin}</p>
          </div>
          <div className="space-y-5">
            <div className="px-5 py-4 bg-bg-subtle rounded-md border-l-2 border-primary">
              <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
                Altitude
              </div>
              <div className="text-base text-white font-medium">{grao.altitude}</div>
            </div>
            <div className="px-5 py-4 bg-bg-subtle rounded-md border-l-2 border-primary">
              <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
                Região
              </div>
              <div className="text-base text-white font-medium">{grao.regiao}</div>
            </div>
            <div className="px-5 py-4 bg-bg-subtle rounded-md border-l-2 border-primary">
              <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
                Produção
              </div>
              <div className="text-base text-white font-medium">{grao.especificacoes.producao_global}</div>
            </div>
            <div className="px-5 py-4 bg-bg-subtle rounded-md border-l-2 border-primary">
              <div className="text-xs font-bold uppercase letter-spacing-widest text-primary mb-1.5">
                Cafeína
              </div>
              <div className="text-base text-white font-medium">{grao.especificacoes.cafeina_percentual}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FLAVOR PROFILE */}
      <section className="px-20 py-24">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Perfil
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-bg-subtle px-7 py-7 rounded-md border border-border text-center transition-all hover:bg-opacity-10 hover:border-border-accent">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Corpo</h3>
            <p className="text-sm text-text-tertiary">{grao.flavor.corpo}</p>
          </div>
          <div className="bg-bg-subtle px-7 py-7 rounded-md border border-border text-center transition-all hover:bg-opacity-10 hover:border-border-accent">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Acidez</h3>
            <p className="text-sm text-text-tertiary">{grao.flavor.acidez}</p>
          </div>
          <div className="bg-bg-subtle px-7 py-7 rounded-md border border-border text-center transition-all hover:bg-opacity-10 hover:border-border-accent">
            <h3 className="font-serif text-lg font-bold text-primary mb-2">Doçura</h3>
            <p className="text-sm text-text-tertiary">{grao.flavor.docura}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-serif text-lg font-bold mb-4">Notas de sabor:</h3>
          <div className="flex flex-wrap gap-3">
            {grao.flavor.notas.map((nota) => (
              <span
                key={nota}
                className="px-3.5 py-2 border border-primary text-primary rounded-pill text-xs font-semibold cursor-pointer transition-all hover:bg-primary hover:text-dark"
              >
                {nota}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODOS RECOMENDADOS */}
      <section className="px-20 py-24">
        <h2 className="font-serif text-4xl font-bold mb-8 letter-spacing-tight">
          Métodos Recomendados
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {grao.metodos_recomendados.map((metodoNome) => {
            const metodoId = metodoNome.toLowerCase().replace(/\s+/g, "-");
            return (
              <a
                key={metodoNome}
                href={`/metodos/${metodoId}`}
                className="bg-bg-subtle px-7 py-7 rounded-md border border-border text-center cursor-pointer transition-all hover:bg-opacity-10 hover:border-border-accent hover:translate-y-[-4px]"
              >
                <h3 className="font-serif text-lg font-bold text-primary">
                  {metodoNome}
                </h3>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
