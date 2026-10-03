import { expect, test } from "@playwright/test";

const cafe = ".cl-amount strong:not(.cl-water-total)";
const agua = ".cl-water-total";
const proporcao = ".cl-ratio strong";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("abre com a receita padrão", async ({ page }) => {
  await expect(page.locator(cafe)).toHaveText("21,9");
  await expect(page.locator(agua)).toHaveText("350");
  await expect(page.locator(proporcao)).toHaveText("1:16");
  await expect(page.getByLabel("Método")).toHaveValue("v60");
});

test("trocar o método recalcula a receita", async ({ page }) => {
  await page.getByLabel("Método").selectOption("prensa");

  await expect(page.locator(proporcao)).toHaveText("1:15");
  await expect(page.locator(cafe)).toHaveText("23,3");
  await expect(page.locator(".cl-recipe-method")).toHaveText("Prensa francesa");
});

test("a intensidade desloca a proporção em um ponto", async ({ page }) => {
  await page.getByRole("button", { name: "Mais leve" }).click();
  await expect(page.locator(proporcao)).toHaveText("1:17");
  await expect(page.locator(cafe)).toHaveText("20,6");

  await page.getByRole("button", { name: "Mais intenso" }).click();
  await expect(page.locator(proporcao)).toHaveText("1:15");
  await expect(page.locator(cafe)).toHaveText("23,3");

  await page.getByRole("button", { name: "Equilibrado" }).click();
  await expect(page.locator(proporcao)).toHaveText("1:16");
});

test("mudar o volume recalcula a quantidade de café", async ({ page }) => {
  await page.getByLabel("Água para o preparo").fill("500");

  await expect(page.locator(agua)).toHaveText("500");
  await expect(page.locator(cafe)).toHaveText("31,3");
});

test("mil mililitros aparecem com separador de milhar", async ({ page }) => {
  await page.getByLabel("Água para o preparo").fill("1000");
  await expect(page.locator(agua)).toHaveText("1.000");
});

test("volume inválido avisa e preserva a última receita válida", async ({
  page,
}) => {
  await page.getByLabel("Água para o preparo").fill("5000");

  // #cl-water-error e não getByRole("alert"): o Next injeta um anunciador de
  // rota com o mesmo papel.
  await expect(page.locator("#cl-water-error")).toBeVisible();
  // A receita continua mostrando o último volume aceito.
  await expect(page.locator(agua)).toHaveText("350");
  await expect(page.locator(cafe)).toHaveText("21,9");
});

/*
 * Pelo teclado, e não com fill(): em contexto de toque o fill() não surte
 * efeito num input[type=range]. End e Home levam aos extremos da escala e,
 * de quebra, exercitam a navegação por teclado do controle.
 */
test("o slider controla o volume e responde ao teclado", async ({ page }) => {
  const slider = page.getByLabel("Ajustar água em mililitros");

  await slider.press("End");
  await expect(page.locator(agua)).toHaveText("1.000");
  await expect(page.locator(cafe)).toHaveText("62,5");

  await slider.press("Home");
  await expect(page.locator(agua)).toHaveText("100");
  await expect(page.locator(cafe)).toHaveText("6,3");
});

test("Moka troca o número por orientação", async ({ page }) => {
  await page.getByLabel("Método").selectOption("moka");

  await expect(page.locator(".cl-moka-info")).toBeVisible();
  await expect(page.locator(cafe)).toHaveCount(0);
  // Sem volume nem intensidade: a medida depende da cafeteira.
  await expect(page.getByLabel("Água para o preparo")).toHaveCount(0);
});

test("o passo a passo abre, mostra os passos do método e fecha", async ({
  page,
}) => {
  const guia = page.locator("#cl-guide");
  await expect(guia).toHaveCount(0);

  await page.getByRole("button", { name: "Ver como preparar" }).click();
  await expect(guia).toBeVisible();
  await expect(guia.getByRole("heading", { name: "Prepare seu V60" })).toBeVisible();
  await expect(guia.locator("ol li")).toHaveCount(3);

  await page.getByRole("button", { name: "Fechar passo a passo" }).click();
  await expect(guia).toHaveCount(0);
});

test("o passo a passo acompanha a troca de método", async ({ page }) => {
  await page.getByRole("button", { name: "Ver como preparar" }).click();
  await page.getByLabel("Método").selectOption("aeropress");

  await expect(
    page.locator("#cl-guide").getByRole("heading", { name: "Prepare seu AeroPress" })
  ).toBeVisible();
});
