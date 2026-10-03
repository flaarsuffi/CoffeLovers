import { notFound } from "next/navigation";
import { getAllGraoIds, getGrao } from "@/lib/data";

export function generateStaticParams() {
  return getAllGraoIds();
}

export default function GraoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const grao = getGrao(params.slug);
  if (!grao) notFound();

  return (
    <>
      <div className="cl-catalog-intro">
        <div className="cl-kicker">
          {grao.tipo === "especie" ? "Conheça a espécie" : "Conheça a variedade"}
        </div>
        <h1>{grao.nome}</h1>
        <p>{grao.perfil}</p>
      </div>

      <p className="cl-note">A página completa do grão entra na próxima etapa.</p>
    </>
  );
}
