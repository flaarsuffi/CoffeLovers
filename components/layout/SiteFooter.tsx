import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="cl-footer">
      <span>© CoffeeLovers · Feito para quem aprecia café.</span>
      <span>
        <Leaf aria-hidden="true" />
        Um bom café começa com curiosidade.
      </span>
    </footer>
  );
}
