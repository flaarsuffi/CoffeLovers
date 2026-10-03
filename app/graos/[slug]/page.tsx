import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllGraoIds, getGrao } from "@/lib/data";
import { GrainHero } from "@/components/grain/GrainHero";
import { GrainEditorial } from "@/components/grain/GrainEditorial";
import { SuggestedMethods } from "@/components/grain/SuggestedMethods";

export function generateStaticParams() {
  return getAllGraoIds();
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const grao = getGrao(params.slug);
  if (!grao) return {};

  return {
    title: `${grao.nome} — CoffeeLovers`,
    description: grao.sensorial,
  };
}

export default function GraoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const grao = getGrao(params.slug);
  if (!grao) notFound();

  return (
    <article aria-labelledby="cl-detail-name">
      <nav className="cl-breadcrumb" aria-label="Caminho da página">
        <Link href="/graos">Todos os grãos</Link>
        <ChevronRight aria-hidden="true" />
        <span>{grao.nome}</span>
      </nav>

      <GrainHero grao={grao} />

      <div className="cl-grain-reading">
        <GrainEditorial grao={grao} />
        <SuggestedMethods grao={grao} />
      </div>
    </article>
  );
}
