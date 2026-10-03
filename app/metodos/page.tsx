import { metodos } from "@/lib/data";
import { MethodCard } from "@/components/catalog/MethodCard";

export default function MetodosPage() {
  return (
    <>
      <div className="cl-catalog-intro">
        <div className="cl-kicker">Encontre seu ritual</div>
        <h1>
          Um método para
          <br />
          <em>cada momento.</em>
        </h1>
        <p>
          Compare o preparo, escolha seu favorito e leve a seleção direto para a
          calculadora.
        </p>
      </div>

      <div className="cl-catalog-grid">
        {metodos.map((metodo) => (
          <MethodCard key={metodo.id} metodo={metodo} />
        ))}
      </div>
    </>
  );
}
