import { expect, test } from "@playwright/test";

/*
 * Os caminhos que atravessam páginas. São os que quebram sem avisar: os
 * testes unitários não enxergam a query string nem o sessionStorage.
 */

test("o catálogo de métodos leva à calculadora com o método escolhido", async ({
  page,
}) => {
  await page.goto("/metodos");
  await page.getByRole("link", { name: "Preparar com Prensa francesa" }).click();

  await expect(page).toHaveURL(/metodo=prensa/);
  await expect(page.getByLabel("Método")).toHaveValue("prensa");
  await expect(page.locator(".cl-ratio strong")).toHaveText("1:15");
});

test("o catálogo de grãos leva à página de conteúdo", async ({ page }) => {
  await page.goto("/graos");
  await page.getByRole("link", { name: /Conhecer Geisha/ }).click();

  await expect(page).toHaveURL("/graos/geisha");
  await expect(page.getByRole("heading", { name: "Geisha", level: 1 })).toBeVisible();
});

test("a página do grão leva à calculadora com o grão preenchido", async ({
  page,
}) => {
  await page.goto("/graos/geisha");
  await page.getByRole("link", { name: "Preparar com Geisha" }).click();

  await expect(page.getByLabel(/Grão/)).toHaveValue("geisha");
});

test("os métodos sugeridos preenchem grão e método de uma vez", async ({
  page,
}) => {
  await page.goto("/graos/bourbon");
  await page
    .getByRole("link", { name: "Preparar Bourbon no AeroPress" })
    .click();

  await expect(page.getByLabel("Método")).toHaveValue("aeropress");
  await expect(page.getByLabel(/Grão/)).toHaveValue("bourbon");
});

test("a seleção sobrevive à navegação entre páginas", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Método").selectOption("prensa");
  await page.getByLabel("Água para o preparo").fill("500");
  await page.getByRole("button", { name: "Mais intenso" }).click();

  // Sai da calculadora, passa pelo catálogo e volta pela página do grão.
  await page.getByRole("link", { name: "Grãos" }).click();
  await page.getByRole("link", { name: /Conhecer Geisha/ }).click();
  await page.getByRole("link", { name: "Preparar com Geisha" }).click();

  // O grão veio da URL; o resto veio da sessão.
  await expect(page.getByLabel(/Grão/)).toHaveValue("geisha");
  await expect(page.getByLabel("Método")).toHaveValue("prensa");
  await expect(page.getByLabel("Água para o preparo")).toHaveValue("500");
  await expect(
    page.getByRole("button", { name: "Mais intenso" })
  ).toHaveAttribute("aria-pressed", "true");
});

test("a query string tem precedência sobre a sessão", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Método").selectOption("prensa");

  await page.goto("/?metodo=coado");

  await expect(page.getByLabel("Método")).toHaveValue("coado");
});

test("parâmetro inválido cai no padrão em vez de quebrar", async ({ page }) => {
  await page.goto("/?metodo=chemex&grao=inexistente");

  await expect(page.getByLabel("Método")).toHaveValue("v60");
  await expect(page.getByLabel(/Grão/)).toHaveValue("");
});

test("a navegação marca a seção atual", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Preparar" })).toHaveAttribute(
    "aria-current",
    "page"
  );

  await page.goto("/graos/bourbon");
  // exact: true para não casar com "Todos os grãos" do caminho da página.
  await expect(
    page.getByRole("link", { name: "Grãos", exact: true })
  ).toHaveAttribute("aria-current", "page");
});

test("slug inexistente devolve 404", async ({ page }) => {
  const resposta = await page.goto("/graos/inexistente");
  expect(resposta?.status()).toBe(404);
});
