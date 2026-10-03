import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/*
 * Varredura automatizada com axe-core. Ela cobre contraste, rótulos, papéis e
 * estrutura — não substitui teste com leitor de tela real, que continua manual.
 */

const PAGINAS = [
  { nome: "calculadora", url: "/" },
  { nome: "catálogo de métodos", url: "/metodos" },
  { nome: "catálogo de grãos", url: "/graos" },
  { nome: "página do grão", url: "/graos/bourbon" },
];

for (const { nome, url } of PAGINAS) {
  test(`${nome} não tem violações de acessibilidade`, async ({ page }) => {
    await page.goto(url);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      violations.map((v) => `${v.id}: ${v.nodes.length} ocorrência(s)`)
    ).toEqual([]);
  });
}

test("o passo a passo aberto também passa na varredura", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ver como preparar" }).click();
  await expect(page.locator("#cl-guide")).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(violations.map((v) => v.id)).toEqual([]);
});

test("o foco vai para o guia ao abrir e volta ao botão ao fechar", async ({
  page,
}) => {
  await page.goto("/");
  const abrir = page.getByRole("button", { name: "Ver como preparar" });

  await abrir.click();
  await expect(page.getByRole("heading", { name: /^Prepare seu/ })).toBeFocused();

  await page.getByRole("button", { name: "Fechar passo a passo" }).click();
  await expect(
    page.getByRole("button", { name: "Ver como preparar" })
  ).toBeFocused();
});

test("os controles principais são alcançáveis por teclado", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Método").focus();
  await expect(page.getByLabel("Método")).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/Grão/)).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Água para o preparo")).toBeFocused();
});

test("o anel de foco é visível", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Método").focus();

  const outline = await page
    .getByLabel("Método")
    .evaluate((el) => getComputedStyle(el).outlineWidth);

  expect(outline).not.toBe("0px");
});
