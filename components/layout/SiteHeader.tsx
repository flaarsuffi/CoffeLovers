"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bean } from "lucide-react";

const NAV = [
  { href: "/", label: "Preparar" },
  { href: "/metodos", label: "Métodos" },
  { href: "/graos", label: "Grãos" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  // /graos/bourbon mantém "Grãos" marcado como seção atual
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="cl-header">
      <Link className="cl-logo" href="/" aria-label="CoffeeLovers, início">
        <span className="cl-mark">
          <Bean aria-hidden="true" />
        </span>
        <span>
          coffee<em>lovers</em>
          <span style={{ color: "var(--cl-gold)" }}>.</span>
        </span>
      </Link>

      <nav className="cl-nav" aria-label="Navegação principal">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
