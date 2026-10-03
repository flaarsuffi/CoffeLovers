# ☕ CoffeeLovers

> Uma calculadora inteligente para fazer o café perfeito. Descubra a proporção ideal de café e água para seu método, aprenda sobre grãos e técnicas de preparo.

## O que é?

CoffeeLovers é um app educativo para amantes de café. Escolha seu método de preparo (pour over, french press, aeropress, moka, italiano), selecione o grão, e a calculadora mostra exatamente quanto café e água você precisa. O app aprende sobre os pares **grão × método** mais apreciados e ajusta a proporção baseado na pesquisa da comunidade.

- 🧮 **Calculadora** com proporção inteligente
- 📖 **Catálogo** de 6 variedades de café com histórias
- 🔧 **5 métodos** de preparo diferentes
- 🌙 **Tema claro e escuro** automático
- ♿ **100% acessível** (testado com axe-core)

---

## Para usar

Acesse em [seu-dominio.com](#) (em breve)

---

## Para desenvolvedores

Clone, instale e rode:

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

### Páginas

| Página | O que tem |
|---|---|
| **Home** `/` | Calculadora completa: escolha método, grão, volume; veja a proporção e o passo a passo |
| **Métodos** `/metodos` | Catálogo dos 5 métodos com dicas |
| **Grãos** `/graos` | Galeria das 6 variedades, com origem e perfil |
| **Detalhes do grão** `/graos/:slug` | História completa de cada grão |

*Métodos não têm página própria — o passo a passo integrado na calculadora é onde acontece a ação.*

### Lógica da calculadora

A proporção tem três camadas:

1. **Base por método**: cada método tem uma proporção padrão (ex: pour over é 1:16)
2. **Ajuste por grão**: alguns pares grão × método são pesquisados — se acham match, substituem a base
3. **Intensidade**: seus controles de "mais leve" e "mais intenso" ajustam o denominador

```
gramas de café = volume de água ÷ denominador
```

**Casos especiais:**
- **Moka**: medida em xícaras (tamanho da cafeteira), sem cálculo de proporção
- **Aliases**: os nomes dos métodos no banco de dados (`coffee-ratios.json`) são mapeados em `lib/data/data.ts`

### Estrutura do projeto

```
app/
  coffeelovers.css        CSS do design system (cópia fiel do kit)
  coffeelovers-next.css   extensões nossas (ajustes de acessibilidade e UX)
  globals.css             estilos da página
components/
  calculator/             calculadora e seus componentes
  catalog/                cards de métodos e grãos
  grain/                  página detalhe do grão
  layout/                 cabeçalho e rodapé
data/                     conteúdo estático (metodos.json, graos.json)
lib/                      tipos, carregamento de dados, formatação, sessão
docs/design-system/       documentação do design system
__tests__/                testes de unidade
e2e/                      testes de ponta a ponta
coffee-ratios.json        banco de dados de proporções por grão × método
```

### Testes

**Unitários** (`__tests__/`)  
Testam cálculo e formatação em isolamento — são rápidos e executam a cada mudança. Um dos testes varre todos os 28 pares grão × método e garante que exatamente 2 têm proporção customizada.

**End-to-end** (`e2e/`) com Playwright  
Simulam um usuário real em desktop e celular:
- **navegacao**: transição entre páginas, URL, sessão
- **calculadora**: seleção, cálculo, validação, slider com teclado
- **proporção-ajustada**: grãos × métodos com pesquisa customizada
- **tema**: claro/escuro sincronizado com o SO
- **acessibilidade**: axe-core, rótulos, navegação

*Manual: leitor de tela de verdade e julgamento visual.*

### Decisões técnicas importantes

- **CSS do kit intocado**: modificações vivem em `coffeelovers-next.css` para que `coffeelovers.css` continue substituível quando o kit for atualizado. Token `--cl-muted-on-soft` foi criado para contraste AA em botões.
- **Sem Tailwind**: o design system usa custom properties, container queries e `light-dark()`. Utilitários perderiam fidelidade.
- **Formatação pt-BR manual**: em `lib/format.ts`. `toLocaleString` pode divergir entre servidor e cliente, quebrando hidratação.
- **Sessão em sessionStorage**: escolhas da receita sobrevivem à navegação sem sujar a URL. Query string tem prioridade. Persistência reage a inputs, não a estado, para evitar apagar dados.

### Tema

Claro e escuro automáticos via `light-dark()`, seguindo o SO. Sem alternador na interface.
