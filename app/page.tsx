import { graos, metodos, getCoffeeCalculatorData } from "@/lib/data";
import { CoffeeCalculatorSection } from "@/components/CoffeeCalculatorSection";

export default function HomePage() {
  const { beans, methods, ratios } = getCoffeeCalculatorData();
  return (
    <>
      {/* HERO SECTION */}
      <section className="px-20 py-20">
        <div className="max-w-2xl mb-12">
          <h1 className="font-serif text-6xl font-bold mb-4 letter-spacing-tight">
            Descubra sua proporção perfeita
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-8 font-light">
            A água e o café formam uma dupla. Encontre a medida exata para seu grão e método, e transforme cada xícara em uma experiência.
          </p>
        </div>

        {/* COFFEE CALCULATOR SECTION */}
        <CoffeeCalculatorSection beans={beans} methods={methods} ratios={ratios} />
      </section>

      {/* EDUCATION CARDS SECTION */}
      <section className="px-20 py-20">
        <h2 className="font-serif text-5xl font-bold mb-8 letter-spacing-tight">
          Entenda o básico
        </h2>
        <p className="text-lg text-text-secondary mb-12 font-light max-w-2xl">
          Os dois pilares que definem seu café
        </p>

        <div className="grid grid-cols-2 gap-8">
          <a
            href="/graos"
            className="bg-bg-subtle px-8 py-8 rounded-md border border-border cursor-pointer transition-all hover:border-primary hover:bg-opacity-50 hover:translate-y-[-4px]"
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              O Grão
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Cada origem traz seu próprio caráter. Arábica oferece notas florais e doces. Bourbon é encorpado com toques de chocolate. Geisha traz delicadeza e aroma único. Explore qual história você quer extrair de seu café.
            </p>
          </a>

          <a
            href="/metodos"
            className="bg-bg-subtle px-8 py-8 rounded-md border border-border cursor-pointer transition-all hover:border-primary hover:bg-opacity-50 hover:translate-y-[-4px]"
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              O Método
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              A técnica de preparo define como o café é extraído. V60 oferece café limpo e brilhante, perfeito para quem quer clareza sensorial. Aeropress é versátil e rápido, ideal para quem tem pouco tempo. French Press entrega corpo intenso, para quem ama profundidade. Escolha o método que combina com seu ritmo.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
