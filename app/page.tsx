import { Suspense } from "react";
import { graos, metodos } from "@/lib/data";
import { Calculator } from "@/components/calculator/Calculator";
import { DiscoveryLinks } from "@/components/calculator/DiscoveryLinks";

export default function PreparePage() {
  return (
    <>
      <div className="cl-intro">
        <div>
          <div className="cl-kicker">Do grão à xícara</div>
          <h1>
            Seu café.
            <br />
            <em>Do seu jeito.</em>
          </h1>
        </div>
        <p>
          Encontre uma boa receita para começar.
          <br />
          Depois, ajuste ao seu paladar.
        </p>
      </div>

      <Suspense fallback={null}>
        <Calculator metodos={metodos} graos={graos} />
      </Suspense>

      <DiscoveryLinks />
    </>
  );
}
