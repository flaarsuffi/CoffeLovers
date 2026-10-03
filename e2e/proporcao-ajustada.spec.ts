import { expect, test } from "@playwright/test";

/*
 * A proporção vem do método e é refinada pela pesquisa por grão × método.
 * Dos 28 pares, apenas dois divergem da base — e a nota só deve aparecer
 * nesses, para não anunciar um ajuste que não mudou nada.
 */

const nota = ".cl-ratio-fonte";

test("Bourbon Amarelo no V60 é sinalizado", async ({ page }) => {
  await page.goto("/?metodo=v60&grao=bourbon-amarelo");

  await expect(page.locator(".cl-ratio strong")).toHaveText("1:15");
  await expect(page.locator(nota)).toContainText("Bourbon Amarelo");
  await expect(page.locator(nota)).toContainText("V60");
});

test("Geisha na Prensa é sinalizado", async ({ page }) => {
  await page.goto("/?metodo=prensa&grao=geisha");

  await expect(page.locator(".cl-ratio strong")).toHaveText("1:16");
  await expect(page.locator(nota)).toContainText("Geisha");
});

test("não sinaliza quando a pesquisa concorda com a base", async ({ page }) => {
  await page.goto("/?metodo=v60&grao=geisha");

  await expect(page.locator(".cl-ratio strong")).toHaveText("1:16");
  await expect(page.locator(nota)).toHaveCount(0);
});

test("não sinaliza sem grão nem em par não pesquisado", async ({ page }) => {
  await page.goto("/?metodo=v60");
  await expect(page.locator(nota)).toHaveCount(0);

  // Coado de papel não está em coffee-ratios.json
  await page.goto("/?metodo=coado&grao=geisha");
  await expect(page.locator(nota)).toHaveCount(0);
});

test("a sinalização some ao trocar para um par sem ajuste", async ({ page }) => {
  await page.goto("/?metodo=prensa&grao=geisha");
  await expect(page.locator(nota)).toBeVisible();

  await page.getByLabel("Método").selectOption("v60");
  await expect(page.locator(nota)).toHaveCount(0);
});
