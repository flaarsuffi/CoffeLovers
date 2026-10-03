# CoffeeLovers

Calculadora de proporção café/água e conteúdo sobre grãos e métodos de preparo.

```bash
npm install
npx playwright install chromium   # uma vez, para os testes de ponta a ponta

npm run dev      # http://localhost:3000
npm test         # Vitest — cálculo e formatação
npm run e2e      # Playwright — fluxos, tema e acessibilidade
npm run e2e:ui   # mesmo, com inspetor visual
npm run lint     # ESLint
npm run build
```

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Calculadora: método, grão opcional, volume, intensidade, passo a passo |
| `/metodos` | Catálogo dos 5 métodos |
| `/graos` | Catálogo das 6 variedades, com nota sobre espécie |
| `/graos/:slug` | Página de conteúdo do grão |

Métodos não têm página própria: o passo a passo vive dentro da calculadora.

## Como a receita é calculada

A proporção parte do **método**. Quando existe pesquisa para aquele par
**grão × método** em `coffee-ratios.json`, ela substitui a base. A intensidade
então soma 1 ao denominador (mais leve) ou subtrai 1 (mais intenso).

```
água ÷ denominador = gramas de café
```

A Moka não entra nessa conta — a medida depende do tamanho da cafeteira, e a
interface mostra orientação em vez de número.

O arquivo de pesquisa nomeia dois métodos de forma diferente do design system
(`french-press` e `italiana`); o alias está em `lib/data/data.ts`.

## Estrutura

```
app/
  coffeelovers.css        CSS do design system, cópia fiel do kit
  coffeelovers-next.css   adaptações nossas (links no lugar de botões,
                          foco visível, alvos de toque, nota de ajuste)
  globals.css             entorno da página
components/
  calculator/             calculadora e seus blocos
  catalog/                cards de método e grão
  grain/                  página de conteúdo do grão
  layout/                 cabeçalho e rodapé
data/                     conteúdo: metodos.json, graos.json
lib/                      tipos, carga de dados, formatação, sessão
docs/design-system/       documento do design system e o kit de referência
__tests__/                testes de unidade: cálculo e formatação
e2e/                      testes de ponta a ponta, em navegador real
coffee-ratios.json        pesquisa de proporção por grão × método
```

## Testes

`__tests__/` cobre o cálculo da receita em isolamento — é rápido e roda a cada
mudança. Um dos casos varre os 28 pares grão × método e afirma que exatamente
dois são ajustados pela pesquisa; mexer em `coffee-ratios.json` sem querer
derruba esse teste.

`e2e/` cobre o que atravessa páginas e só existe no navegador, com Playwright em
dois perfis (desktop e celular):
- **navegacao.spec.ts**: transição entre páginas, query string, sessionStorage
- **calculadora.spec.ts**: seleção, cálculo, validação, slider com teclado
- **proporcao-ajustada.spec.ts**: pares grão × método com pesquisa customizada
- **tema.spec.ts**: tema claro e escuro, sincronização com sistema operacional
- **acessibilidade.spec.ts**: varredura com axe-core, rótulos e navegação

O que continua manual: leitor de tela de verdade e julgamento visual.

## Decisões que não são óbvias no código

- **O CSS do kit não é editado.** Tudo que precisamos mudar vive em
  `coffeelovers-next.css`, para que `coffeelovers.css` continue substituível
  quando o kit for atualizado. Token adicional `--cl-muted-on-soft` foi criado
  para garantir contraste AA em botões de intensidade e sugestões.
- **Sem Tailwind.** O design system é feito de custom properties, container
  queries e `light-dark()`; traduzir para classes utilitárias perderia
  fidelidade.
- **Formatação pt-BR feita à mão** em `lib/format.ts`. `toLocaleString` pode
  divergir entre servidor e cliente e quebrar a hidratação.
- **A seleção da receita fica em `sessionStorage`**, para sobreviver à
  navegação entre páginas sem sujar a URL. A query string tem precedência.
  Persistência é reação aos manipuladores do usuário, não a mudanças de estado,
  para evitar apagar dados antes de recuperá-los.

## Tema

Claro e escuro, resolvidos por `light-dark()` e seguindo o sistema
operacional. Não há alternador na interface.
