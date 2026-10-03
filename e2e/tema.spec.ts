import { expect, test } from "@playwright/test";

/*
 * O tema segue o sistema operacional, resolvido por light-dark(). Não há
 * alternador na interface, então o que se verifica é a resposta à preferência.
 */

async function fundoDoApp(page: import("@playwright/test").Page) {
  return page
    .locator(".cl-app")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
}

test.describe("tema claro", () => {
  test.use({ colorScheme: "light" });

  test("usa o fundo creme", async ({ page }) => {
    await page.goto("/");
    expect(await fundoDoApp(page)).toBe("rgb(245, 241, 233)");
  });
});

test.describe("tema escuro", () => {
  test.use({ colorScheme: "dark" });

  test("usa o fundo escuro", async ({ page }) => {
    await page.goto("/");
    expect(await fundoDoApp(page)).toBe("rgb(23, 27, 24)");
  });

  test("o painel da receita mantém o verde profundo nos dois temas", async ({
    page,
  }) => {
    await page.goto("/");
    const fundo = await page
      .locator(".cl-recipe")
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(fundo).toBe("rgb(35, 60, 44)");
  });
});

test("o conteúdo é o mesmo nos dois temas", async ({ browser }) => {
  const claro = await browser.newPage({ colorScheme: "light" });
  const escuro = await browser.newPage({ colorScheme: "dark" });

  await claro.goto("/");
  await escuro.goto("/");

  const texto = ".cl-amount strong:not(.cl-water-total)";
  expect(await claro.locator(texto).textContent()).toBe(
    await escuro.locator(texto).textContent()
  );

  await claro.close();
  await escuro.close();
});
