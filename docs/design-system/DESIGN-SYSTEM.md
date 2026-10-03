# CoffeeLovers — Design System

**Versão 1.0 · 3 de outubro de 2026 · Referência técnica para implementação**

Este documento especifica a proposta aprovada na conversa: calculadora, catálogo de métodos, catálogo de grãos e páginas de conteúdo sobre cada grão. Os valores abaixo foram extraídos do protótipo entregue. O arquivo `assets/styles.css` é a referência final da cascata; `docs/css-reference.json` contém o inventário completo de declarações, incluindo exceções e estilos inline.

O produto ainda é um protótipo. Os textos demonstram a organização editorial e não representam uma migração integral do site original. As receitas, o conteúdo final e a experiência em navegadores e tecnologias assistivas precisam de validação na implementação.

## 1. Direção visual

O sistema combina uma interface editorial com uma ferramenta prática de preparo. Fraunces traz personalidade aos títulos; DM Sans mantém os controles e a leitura objetivos. A paleta parte de creme, verde profundo e caramelo. A receita é o principal bloco de contraste, e a navegação permanece visível no cabeçalho.

- Hierarquia: tarefa e resultado → descoberta → aprofundamento editorial.
- Superfícies: fundos sólidos, bordas discretas e sombra apenas na opção selecionada do controle de intensidade.
- Espaçamento: conteúdo agrupado por proximidade; intervalos maiores entre seções.
- Conteúdo: o catálogo apresenta um resumo; a página do grão conserva o espaço para história, cultivo, degustação e preparo.
- Interações: seleções explícitas, resultado imediato e continuidade entre conteúdo e calculadora.
- Ornamentação: ícones de linha; sem gradientes, animações ou fotografias obrigatórias nesta versão.

## 2. Arquivos e uso

| Arquivo | Função |
|---|---|
| `index.html` | Documento editável do protótipo, sem framework |
| `assets/styles.css` | CSS do produto |
| `assets/data.js` | Conteúdo dos métodos, grãos e receitas demonstrativas |
| `assets/app.js` | Estado e interações locais |
| `assets/lucide.min.js` | Ícones disponíveis localmente |
| `assets/prototype-shell.css` | Apresentação externa do protótipo |
| `assets/prototype-controls.js` | Seletores externos de tema e largura |
| `docs/design-tokens.json` | Inventário de tokens e escalas |
| `docs/css-reference.json` | Todas as regras CSS na ordem da cascata |
| `docs/contrast-reference.json` | Contrastes calculados para pares selecionados |

Abra `index.html` no navegador. Não é necessário instalar dependências nem executar uma compilação. O arquivo único `coffeelovers-prototipo.html` contém a mesma interface com CSS, conteúdo, ícones e JavaScript incorporados.

As fontes são solicitadas ao Google Fonts. Sem internet, o conteúdo continua funcionando, mas usa Arial e Georgia. Para reprodução tipográfica offline, distribua os arquivos das fontes e substitua o `@import` por regras `@font-face`, preservando suas licenças.

A barra superior com “Aparência” e “Largura” é uma ferramenta de apresentação; não integra o design do produto. Na aplicação final, podem ser removidos os dois arquivos `prototype-*` e o elemento `#prototype-controls`.

## 3. Cores semânticas

| Token | Claro | Escuro | Aplicação |
|---|---|---|---|
| `--cl-bg` | `#f5f1e9` | `#171b18` | Fundo principal |
| `--cl-surface` | `#fffcf6` | `#232923` | Campos e cartões claros/alternativos |
| `--cl-soft` | `#eee8dc` | `#30372f` | Superfícies secundárias e seleções |
| `--cl-ink` | `#24372c` | `#f4efe4` | Texto principal e marca |
| `--cl-muted` | `#657065` | `#b1baae` | Texto de apoio |
| `--cl-line` | `#dbded3` | `#404b40` | Bordas sutis e divisores |
| `--cl-accent` | `#305740` | `#c5d5a8` | Ações, links e destaque editorial |
| `--cl-on-accent` | `#fffdf5` | `#233327` | Texto em ações com accent |
| `--cl-gold` | `#8a5b25` | `#dfbc82` | Sobretítulos e detalhes |
| `--cl-dark` | `#233c2c` | `#233c2c` | Painéis de receita e perfil sensorial |
| `--cl-cream` | `#fbf4e6` | `#fbf4e6` | Texto principal nos painéis escuros |

Os tokens são propriedades CSS do elemento `#coffee-next`. Os dois temas usam as mesmas funções semânticas, com valores diferentes. Evite utilizar uma cor literal de texto claro sobre uma superfície clara por copiar um componente fora de seu contexto.

```css
/* Exemplo de uso; as definições completas estão no styles.css. */
.componente {
  background: var(--cl-surface);
  color: var(--cl-ink);
  border: 1px solid var(--cl-line);
}
```

### 3.1 Cores locais de componentes

Estas cores existem no protótipo, mas ainda não foram promovidas a variáveis semânticas. Se forem transformadas em tokens na aplicação, mantenha os valores e as aplicações abaixo para preservar a proposta.

| Valor | Aplicação atual |
|---|---|
| `#233c2c` | Fundo dos painéis de receita e perfil sensorial |
| `#fbf4e6` | Texto principal nesses painéis |
| `#c8d5be` | Títulos auxiliares, legendas e conteúdo secundário nos painéis |
| `#bbcbb5` | Nome do grão e resumo de intensidade na receita |
| `#d7decf` | Unidades g/ml |
| `#e8e8d8` | Texto da proporção |
| `#b5c6ae` | Rótulos de proporção, moagem e tempo |
| `#cfbd93` | Ícones de moagem e tempo |
| `#d6c39a` | Ponto decorativo ao lado de “Sua próxima xícara” |
| `#ebeadc` | Nome do método no selo da receita |
| `#e4cfaa` | Fundo do CTA principal e detalhes sensoriais |
| `#273b2c` | Texto do CTA sobre caramelo |
| `#f3ddb6` | Fundo do CTA principal em hover |
| `#c0cdb7` | Nota ao final da receita |
| `#d8e2cd` | Texto explicativo do estado Moka |
| `#ad302c` / `#ffb4ab` | Mensagem de erro no tema claro / escuro |
| `#ffffff30` | Borda branca com aproximadamente 18,8% de opacidade |
| `#ffffff25` | Divisor branco com aproximadamente 14,5% de opacidade |
| `#00000008` | Sombra preta com aproximadamente 3,1% de opacidade |

Inventário literal completo do CSS do produto: `#00000008`, `#171b18`, `#232923`, `#233327`, `#233c2c`, `#24372c`, `#273b2c`, `#30372f`, `#305740`, `#404b40`, `#657065`, `#8a5b25`, `#ad302c`, `#b1baae`, `#b5c6ae`, `#bbcbb5`, `#c0cdb7`, `#c5d5a8`, `#c8d5be`, `#cfbd93`, `#d6c39a`, `#d7decf`, `#d8e2cd`, `#dbded3`, `#dfbc82`, `#e4cfaa`, `#e8e8d8`, `#ebeadc`, `#eee8dc`, `#f3ddb6`, `#f4efe4`, `#f5f1e9`, `#fbf4e6`, `#ffb4ab`, `#fffcf6`, `#fffdf5`, `#ffffff25`, `#ffffff30`.

Não há cores específicas de sucesso, aviso ou informação nesta versão. O ponto da receita é decorativo; não representa disponibilidade de servidor ou estado de conexão.

### 3.2 Seleção de tema

| Atributo no elemento raiz | Resultado |
|---|---|
| `data-look="system"` | Usa o esquema de cores herdado do documento/sistema |
| `data-look="cream"` | Define `color-scheme: light` |
| `data-look="espresso"` | Define `color-scheme: dark` |

As cores variáveis são resolvidas por `light-dark()`. O documento exportado declara suporte a `light dark`. Os painéis escuros permanecem com sua identidade verde profunda em ambos os temas.

## 4. Tipografia

### 4.1 Famílias e pesos

| Papel | Família | Fallback | Pesos solicitados |
|---|---|---|---|
| Interface, formulários, texto e legendas | DM Sans | Arial, sans-serif | 400, 500, 600, 700 |
| Títulos editoriais e números de destaque | Fraunces | Georgia, serif | Regular 400/500 e itálico 400 |

Fraunces é utilizada predominantemente em peso 400. O peso 500 também está no pedido de fonte, mas não é necessário aos títulos atuais. Itálico é aplicado à segunda parte da marca e aos destaques dos títulos. A interface utiliza 500 para ênfase moderada, 600 para controles selecionados e 700 nos sobretítulos.

Base do produto: **15 px**, peso **400**, entrelinha **1,5**. Os campos herdam a família da interface. Títulos não usam as margens padrão do navegador. Valores abaixo são CSS px, não pixels físicos de dispositivo.

### 4.2 Escala por papel

`H` é a entrelinha relativa; por exemplo, 14 px × 1,85 = 25,9 px. “Herdada” significa que a propriedade não é redefinida nesse seletor; consulte a cascata ao mover o componente para outro contexto.

| Papel / seletor | Tamanho base | Peso | H | Tracking |
|---|---:|---:|---:|---:|
| Título inicial `h1` | 45 px | 400 | 1,13 | −1,5 px |
| Título de catálogo `.cl-catalog-intro h1` | 39 px | 400 | 1,13 | −1,5 px |
| Nome do grão `.cl-grain-hero h1` | 55 px | 400 | 1,13 | −1,5 px |
| Número principal de café | 58 px | 400 | 1,1 | −2 px |
| Número de água na receita | 42 px | 400 | 1,1 | −1,5 px |
| Título do estado Moka | 35 px | 400 | 1,2 | herdado |
| Título editorial de seção | 27 px | 400 | 1,3 | −0,4 px |
| Título de card no catálogo | 25 px | 400 | 1,2 | −0,4 px |
| Título do passo a passo | 25 px | 400 | 1,3 | herdado |
| Título no painel sensorial | 25 px | 400 | 1,3 | −0,3 px |
| Título “Conheça seu café” | 23 px | 400 | 1,3 | −0,4 px |
| Subtítulo do grão | 23 px | 400 | 1,35 | herdado |
| Título do painel lateral do grão | 23 px | 400 | 1,3 | herdado |
| Marca | 20 px | 600; itálico 400 | herdada | −0,5 px |
| Entrada numérica de água | 18 px | 500 | herdada | herdado |
| Título do formulário | 16 px | 600 | 1,4 | −0,3 px |
| Unidades do resultado | 16 px | 400 | herdada | herdado |
| Texto editorial principal | 14 px | 400 | 1,85 | herdado |
| Introdução do catálogo | 14 px | 400 | herdada | herdado |
| Título do card de descoberta | 14 px | 500 | 1,5 | herdado |
| Select | 14 px | 400 | herdada/nativa | herdado |
| Cabeçalho de accordion | 14 px | 500 | 1,5 | herdado |
| Navegação | 13 px | 400; selecionada 600 | herdada | herdado |
| CTA principal | 13 px | 600 | herdada | herdado |
| CTA do grão | 13 px | 500 | herdada | herdado |
| Introdução inicial | 13 px | 400 | 1,65 | herdado |
| Texto dentro de accordion | 13 px | 400 | 1,85 | herdado |
| Rótulo de campo | 12 px | 500 | herdada | herdado |
| Controle de intensidade | 12 px | 400; selecionado 600 | herdada | herdado |
| Texto de card no catálogo | 12 px | 400 | 1,65 | herdado |
| Texto no painel sensorial | 12 px | 400 | 1,75 | herdado |
| Chips de notas sensoriais | 12 px | 400 | herdada | herdado |
| Sobretítulo `.cl-kicker` | 11 px | 700 | herdada | 1,8 px |
| Notas auxiliares `.cl-note` | 11 px | 400 | 1,6 | herdado |
| Link de fonte editorial | 11 px | 400 | 1,6 | herdado |
| Selo do método | 11 px | 400 | herdada | 0,6 px |
| Rodapé, tags e nota final de receita | 10 px | 400 | 1,5 ou herdada | herdado |

Existe ênfase por `strong` em alguns textos com peso nativo do navegador. Para equivalência integral, consulte os seletores e o HTML, não apenas esta tabela de papéis principais.

### 4.3 Alterações responsivas de tipografia

| Elemento | >760 px | ≤760 px | ≤570 px | ≤350 px |
|---|---:|---:|---:|---:|
| Título inicial | 45 | 40 | 36 | 33 |
| Título de catálogo | 39 | 39 | 33 | 33 |
| Nome do grão | 55 | 43 | 42 | 42 |
| Quantidade de café | 58 | 49 | 54 | 48 |
| Quantidade de água | 42 | 35 | 41 | 41 |
| Select | 14 | 14 | 16 | 16 |
| Marca | 20 | 20 | 21 | 21 |
| Texto editorial principal | 14 | 14 | 15 | 15 |
| Título de seção editorial | 27 | 27 | 25 | 25 |
| Subtítulo do grão | 23 | 23 | 22 | 22 |
| Sobretítulo | 11 | 11 | 10 | 10 |

No layout estreito, o título inicial usa tracking de −1 px. Os números crescem novamente no celular porque o cartão da receita passa a ocupar uma linha inteira. As regras são baseadas na largura do contêiner do produto.

### 4.4 Convenções de conteúdo

- Usar caixa de sentença nos rótulos; caixa alta apenas nos sobretítulos.
- Manter unidades junto ao valor e identificar o ingrediente: “21,9 g de café”.
- Usar vírgula decimal e formatação `pt-BR` nos resultados.
- O campo numérico de água usa algarismos tabulares (`tabular-nums`). Os números editoriais Fraunces não recebem essa propriedade nesta versão.
- Evitar títulos longos que substituam o nome do grão por uma lista de sabores.
- Referências sensoriais não são promessas absolutas de sabor.

## 5. Layout e responsividade

O elemento `#coffee-next` tem largura de 100%, máximo de **1100 px**, margem horizontal automática e `container: coffee / inline-size`. O produto se organiza por **container queries**, não por media queries de viewport. A simulação de celular limita esse contêiner a **390 px**.

| Região | Estrutura base | Adaptação |
|---|---|---|
| Cabeçalho | Flex horizontal, marca à esquerda, navegação à direita | Navegação ocupa uma segunda linha em ≤570 px |
| Abertura inicial | Título e apoio lado a lado | Empilha em ≤760 px |
| Calculadora | `1.14fr 1fr`, gap 20 px | Gap 15 em ≤760; uma coluna e gap 14 em ≤570 |
| Campos método/grão | Duas colunas iguais, gap 12 | Uma coluna em 571–760; duas com gap 10 em 351–570; uma em ≤350 |
| Valores da receita | Duas colunas iguais, gap 15 | Mantém duas colunas |
| Moagem/tempo | Duas colunas iguais, gap 15 | Mantém duas colunas |
| Descoberta | Duas colunas iguais, gap 15 | Uma coluna em ≤570 |
| Catálogo | Três colunas, gap 15 | Duas em ≤760; uma em ≤570 |
| Passo a passo | Três colunas, gap 20 | Uma coluna, gap 15 em ≤570 |
| Hero do grão | `1.35fr 1fr`, gap 30 | `1.1fr 1fr`, gap 20 em ≤760; uma coluna em ≤570 |
| Conteúdo/aside do grão | `1.65fr 1fr`, gap 35 | `1.4fr 1fr`, gap 24 em ≤760; uma coluna em ≤570 |
| Dicas de degustação | Três colunas, gap 16 | Uma coluna em ≤760 |

O comportamento não é estritamente linear: os campos voltam a duas colunas quando a calculadora passa a ocupar a linha inteira. Preserve essa lógica ao migrar o layout.

### 5.1 Contêineres e respiros externos

Valores de padding seguem a ordem CSS: topo, direita, base, esquerda.

| Elemento | Base | ≤760 px | ≤570 px | ≤350 px |
|---|---|---|---|---|
| Cabeçalho | 22px 38px | 20px 25px | 18px 20px 12px | 17px 16px 12px |
| Conteúdo principal | 30px 38px 32px | 26px 25px | 22px 20px 25px | 21px 16px |
| Formulário/receita | 24px | 20px | 18px | 16px |
| Rodapé | 17px 38px | 16px 25px | 16px 20px | igual ao anterior |
| Card de descoberta | 16px | 16px | 13px | igual ao anterior |
| Card de catálogo | 19px | 19px | 19px | igual ao anterior |
| Guia de preparo | 22px | 22px | 18px | igual ao anterior |
| Painel sensorial | 25px | 21px | 20px | igual ao anterior |
| Aside do grão | 21px | 21px | 20px | igual ao anterior |

Não há cabeçalho fixo, coluna sticky, modal nem rolagem interna do produto. As páginas usam fluxo normal do documento. O elemento de apresentação externa tem seus próprios espaçamentos, que não devem ser copiados para a aplicação.

## 6. Espaçamento

Inventário dos valores explícitos de espaçamento encontrados no CSS, em px: **2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35, 38**. `0`, `auto` e porcentagens são tratados separadamente pelas regras.

A proposta usa ajustes ópticos, não uma escala rígida de múltiplos de quatro. Valores como 7, 13, 19, 21, 25 e 38 fazem parte do desenho atual. Não os arredonde automaticamente se a intenção for reproduzir a interface aprovada.

| Uso | Valor base |
|---|---:|
| Rótulo → campo | 7 px |
| Entre campos lado a lado | 12 px |
| Cabeçalho do formulário → campos | 20 px |
| Campos → grupo de água | 22 px |
| Água → preferência | 18 px |
| Preferência → nota auxiliar | 13 px |
| Formulário ↔ receita | 20 px |
| Calculadora → descoberta | 29 px |
| Título da descoberta → cards | 13 px |
| Entre cards de catálogo/descoberta | 15 px |
| Breadcrumb → hero do grão | 27 px |
| Nome do grão → subtítulo | 14 px |
| Subtítulo → chips | 16 px |
| Chips → CTA | 23 px |
| Hero → divisor e próxima seção | 28 px de padding + 28 px de margem |
| Entre colunas de leitura do grão | 35 px |
| Cabeçalho de accordion | 16 px de padding vertical |

No mobile, esses espaçamentos são reduzidos seletivamente. O inventário por seletor em `css-reference.json` inclui todas as substituições.

## 7. Bordas, raios, sombras e camadas

| Elemento | Raio |
|---|---:|
| Moldura do produto, formulário, receita, perfil sensorial | `--cl-radius`: 20 px |
| Navegação | 30 px |
| Chips de sabor e tags arredondadas | 20 px |
| Aside do grão | 16 px |
| Cards de catálogo e guia | 15 px |
| Cards de descoberta | 14 px |
| Nota educativa sobre Arábica | 12 px |
| Fundo do ícone de descoberta | 11 px |
| Grupo segmentado | 10 px |
| Select, campo numérico e CTAs principais | 9 px |
| CTA de card de catálogo | 8 px |
| Opção dentro do grupo segmentado | 7 px |
| Marca, ponto decorativo e botão fechar | 50% |

As bordas estruturais têm **1 px solid** e usam `--cl-line`. Divisores dos painéis verdes usam branco com transparência. A única sombra explícita é `0 1px 3px #00000008`, na intensidade selecionada.

O sistema não define níveis de elevação ou uma escala de `z-index`. Não há overlays. Não existe blur de fundo. `overflow: clip` está na moldura do produto; textos longos e foco devem ser conferidos ao adaptar componentes.

`--cl-radius` controla apenas os grandes painéis que o referenciam; não altera todos os raios do sistema.

## 8. Componentes

### 8.1 Cabeçalho e navegação

- Marca: símbolo em círculo de 35 × 35 px, ícone de 19 px, gap de 10 px para o nome.
- Navegação: gap de 5 px; item com padding 9 × 15 px, altura mínima 40 px.
- Selecionado: superfície `--cl-soft`, texto `--cl-ink`, peso 600 e `aria-current="page"`.
- Hover: superfície soft e texto ink.
- Mobile: três itens dividem a largura; altura mínima 41 px, padding 8 × 10 px.
- O cabeçalho navega entre Preparar, Métodos e Grãos. Na página de detalhe, Grãos permanece ativo.

### 8.2 Select e entrada numérica

- Select: largura 100%, `min-width: 0`, altura 45 px, raio 9 px, borda de 1 px.
- Padding: 10 × 11 px; no mobile, 9 × 7 px.
- Rótulo ligado por `for`/`id`. A observação “opcional” utiliza o texto secundário.
- Campo de água: wrapper com padding 4 × 10 px; input com largura 62 px, altura mínima 30 px e texto alinhado à direita.
- O protótipo usa `input type="number"`, `inputmode="numeric"`, mínimo 100, máximo 1000, passo 1.
- Erro: texto de 12 px, margem superior 6 px, `role="alert"`, `aria-invalid` no campo e descrição associada.
- Os controles mantêm o comportamento nativo do navegador, incluindo sua aparência de foco.

### 8.3 Slider

- Largura 100%; caixa de controle com 35 px de altura; margem superior 5 px.
- `accent-color: var(--cl-accent)`; trilho e thumb usam a implementação nativa do navegador.
- Valores 100–1000 ml; na exportação, passo 1 ml para sincronizar exatamente com a digitação.
- Legendas de mínimo/máximo: 11 px.
- Atualiza o resultado durante a interação; a mensagem acessível é anunciada no evento de conclusão da alteração.

### 8.4 Intensidade

- Grupo com fundo soft, padding 4 px, gap 5 px e raio 10 px.
- Três botões com a mesma flexibilidade: Mais leve, Equilibrado e Mais intenso.
- Altura mínima: 36 px no desktop e 39 px no mobile; texto de 12 px.
- Opção selecionada: superfície, borda line, texto ink, peso 600, sombra discreta e `aria-pressed="true"`.
- Não há estado disabled implementado para essas opções.

### 8.5 Cartão de receita

- Fundo dark e texto cream; raio 20 px; padding responsivo igual ao formulário.
- Cabeçalho: nome da seção à esquerda e selo do método à direita.
- Quantidade de café é o maior valor; água aparece ao lado com tamanho secundário.
- Proporção usa descrição “café : água”. Moagem e tempo ocupam duas colunas.
- CTA com largura total, altura mínima 44 px, padding 11 × 14 px, raio 9 px e gap 9 px.
- CTA caramelo: texto `#273b2c`; hover `#f3ddb6`.
- Estado Moka substitui o cálculo numérico por orientação dependente da capacidade da cafeteira.
- Nota inferior: 10 px e entrelinha 1,5.

### 8.6 Descoberta e catálogo

- Card de descoberta: botão de largura total, texto à esquerda, ícone à esquerda e seta à direita.
- Fundo surface, borda line, raio 14 px; hover altera a borda para accent.
- Área do ícone: 47 × 47 px, raio 11 px; em mobile, 43 × 43 px.
- Card de catálogo: artigo com padding 19 px, raio 15 px e gap interno de 12 px.
- Título Fraunces 25 px; texto de apoio 12 px; metadados 11 px e divisor superior.
- CTA de catálogo: altura mínima 40 px, padding 8 px, raio 8 px.
- Hover desse CTA inverte para fundo accent e texto on-accent.
- Catálogo de métodos tem cinco opções. Catálogo de grãos tem seis variedades e uma entrada educativa separada para a espécie Arábica.

### 8.7 Detalhe de grão

- Breadcrumb: 12 px, gap 9 px, botão “Todos os grãos” com altura mínima 32 px.
- Hero: nome, subtítulo, notas sensoriais e CTA; painel “Perfil na xícara” ao lado.
- Chips: padding 5 × 11 px, raio 20 px, gap 7 px, quebra de linha permitida.
- CTA do grão: altura mínima 44 px, padding 11 × 17 px, fonte 13 px, raio 9 px. No mobile ocupa 100% da largura.
- Leitura principal: origem/história, fonte, degustação e informações em accordions.
- Aside: métodos sugeridos; cada botão tem altura mínima 44 px, padding 11 px, raio 9 px e tempo auxiliar de 11 px.
- Nome do grão permite quebra com `overflow-wrap: anywhere` para títulos longos.

### 8.8 Accordions e guia de preparo

- Informações do grão usam `details`/`summary` nativos; Altitude e região inicia aberto.
- Summary: padding vertical 16 px; texto 14 px, passando a 15 px no mobile.
- Painéis são separados por bordas de 1 px. Texto expandido: 13 px / entrelinha 1,85.
- Guia da calculadora: inicialmente fechado; botão altera `aria-expanded` e o rótulo entre Ver como preparar e Ocultar passo a passo.
- Guia contém uma lista de três etapas numeradas por contador CSS.
- Fechar: botão circular de 34 × 34 px, ícone de 16 px e nome acessível.

## 9. Ícones

Biblioteca da exportação: **Lucide 1.8.0**, incluída localmente, sob licença ISC. O código utiliza `data-lucide` e `lucide.createIcons()`. Não existem ícones autorais ou fontes de ícones.

Nomes utilizados: `bean`, `circle-dot`, `clock-3`, `arrow-up-right`, `arrow-right`, `coffee`, `x`, `leaf`, `cylinder`, `glass-water`, `filter`, `flame`, `chevron-right`.

| Uso | Dimensão |
|---|---:|
| Inicialização geral | 18 × 18 px |
| Marca | 19 × 19 px |
| Moagem, tempo, CTA e fechar | 16 × 16 px |
| Link textual | 15 × 15 px |
| Ícone de descoberta | 22 × 22 px |
| Seta no card de descoberta | 17 × 17 px |
| Card do catálogo | 27 × 27 px |
| Rodapé | 12 × 12 px |
| Breadcrumb | 13 × 13 px |
| Painel sensorial | 19 × 19 px |

A cor vem de `currentColor`. Ícones decorativos têm `aria-hidden="true"`. Botões exclusivamente com ícone precisam de rótulo acessível. Não reduzir a área clicável ao tamanho do desenho do ícone.

## 10. Estados, feedback e movimento

| Estado | Implementação atual |
|---|---|
| Padrão | Superfícies e bordas definidas por componente |
| Hover | Navegação, CTA principal, CTAs de catálogo, descoberta e métodos do grão |
| Selecionado | `aria-current` na navegação; `aria-pressed` na intensidade |
| Foco | Indicador nativo do navegador; sem remoção explícita de outline |
| Erro | Volume vazio, fora da faixa ou não inteiro; mensagem e `aria-invalid` |
| Aberto/fechado | `hidden`, `aria-expanded` e accordions nativos |
| Disabled | Apenas cursor padrão em regra genérica; sem linguagem visual completa |
| Carregando | Não implementado: dados e cálculo locais |
| Vazio | Não há busca/filtro ou fonte assíncrona nesta versão |
| Sucesso | Resultado atualizado; não há toast |

Não existem transições, animações ou temporizadores. A atualização é imediata. Durações e curvas de movimento não estão definidas, portanto não devem ser descritas como tokens existentes.

Ao conectar uma fonte de dados, definir estados de carregamento, falha e ausência de conteúdo antes da publicação. A estrutura atual não simula esses cenários.

## 11. Fluxos e contrato funcional

| Ação | Resultado |
|---|---|
| Clicar na marca | Volta a Preparar |
| Selecionar um método no catálogo | Preenche o método e abre a calculadora |
| Conhecer um grão | Abre sua página de conteúdo |
| Preparar com o grão | Mantém o método atual, preenche o grão e abre a calculadora |
| Escolher método no aside do grão | Preenche grão e método e abre a calculadora |
| Trocar volume ou intensidade | Recalcula a receita |
| Selecionar Moka | Mostra orientação específica e oculta quantidade/intensidade |
| Recarregar o documento | Reinicia o estado local |

Estado inicial da exportação: Preparar, V60, “Não sei meu grão”, 350 ml, Equilibrado. O estado permanece durante a navegação interna, mas não é salvo em armazenamento local. O grão altera o contexto exibido; não altera a fórmula da receita.

### 11.1 Fórmula demonstrativa

`gramas de café = água em ml ÷ denominador da proporção`.

| Método | Denominador base | Tempo exibido | Moagem exibida |
|---|---:|---|---|
| V60 | 16 | 3–4 min | Média-fina |
| AeroPress | 15 | 2–3 min | Média-fina |
| Prensa francesa | 15 | 4 min | Grossa |
| Coado de papel | 16 | 3–4 min | Média |
| Moka | sem cálculo universal | Varia por tamanho | Conforme fabricante |

Mais leve soma 1 ao denominador; Mais intenso subtrai 1; Equilibrado mantém a base. O resultado é apresentado com uma casa decimal em `pt-BR`. Estas são configurações da demonstração de interface, não uma validação técnica completa das receitas.

O volume inválido não substitui o último valor válido da receita. Antes de produção, avaliar se o resultado deve também indicar explicitamente que aguarda correção da entrada.

### 11.2 Modelo de dados

| Objeto | Campos principais |
|---|---|
| `methods` | name, ratio, grind, time, level, icon, desc, steps |
| `grains[]` | name, profile, notes, body |
| `grainDetails` | history, source, publisher, sensory, taste, cultivation, brew, pairing, methods |
| `arabicaInfo` | name, profile, notes, body |

O conteúdo está isolado em `assets/data.js` e exposto como `window.CoffeeLoversData`. `assets/app.js` lê esse objeto. Os links de fontes editoriais abrem em outra aba com `noopener noreferrer`.

## 12. Acessibilidade e contraste

Recursos presentes: idioma `pt-BR`, elementos nativos, rótulos ligados aos inputs, região de status `aria-live="polite"`, mensagens de erro, seleção programática nos controles, controles por teclado nativos e conteúdo disponível sem hover.

### 12.1 Contrastes calculados

As razões abaixo foram calculadas por luminância relativa a partir dos valores hexadecimais. São verificações de pares, sem avaliação visual da página inteira e sem certificação de conformidade.

| Tema | Primeiro plano | Fundo | Razão |
|---|---|---|---|
| light | `--cl-ink` | `--cl-bg` | 11.24:1 |
| light | `--cl-muted` | `--cl-bg` | 4.59:1 |
| light | `--cl-muted` | `--cl-surface` | 5.05:1 |
| light | `--cl-gold` | `--cl-bg` | 5.17:1 |
| light | `--cl-on-accent` | `--cl-accent` | 8.05:1 |
| light | `--cl-line` | `--cl-surface` | 1.33:1 |
| dark | `--cl-ink` | `--cl-bg` | 15.18:1 |
| dark | `--cl-muted` | `--cl-bg` | 8.71:1 |
| dark | `--cl-muted` | `--cl-surface` | 7.43:1 |
| dark | `--cl-gold` | `--cl-bg` | 9.66:1 |
| dark | `--cl-on-accent` | `--cl-accent` | 8.55:1 |
| dark | `--cl-line` | `--cl-surface` | 1.63:1 |
| both | `#fbf4e6` | `#233c2c` | 10.94:1 |
| both | `#c8d5be` | `#233c2c` | 7.82:1 |
| both | `#b5c6ae` | `#233c2c` | 6.64:1 |
| both | `#273b2c` | `#e4cfaa` | 7.90:1 |

Referência para texto: 4,5:1 para texto comum e 3:1 para texto grande, conforme [W3C — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). `--cl-line` é um divisor sutil; não deve ser tratado como uma borda acessível garantida. Quando a borda for necessária para identificar um controle, avaliar 3:1 em relação às cores adjacentes, conforme [W3C — Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### 12.2 Pontos a fechar na implementação

- Medir o foco nos dois temas e garantir visibilidade, inclusive junto a áreas com `overflow: clip`. A proposta conserva o foco do navegador, mas não define um token de ring.
- Garantir movimentação de foco adequada ao trocar de página e ao fechar o guia. Isso ainda não está implementado como gerenciamento explícito de foco.
- Conferir o nome acessível de todos os ícones e botões depois da migração.
- Há texto auxiliar de 10–12 px e controles com altura de 32–41 px. Preservados na referência, mas devem ser validados no uso real.
- A meta de conforto sugerida para controles de toque é 44–48 px; ela não é atendida por todos os controles atuais. O mínimo AA de WCAG 2.2 é 24 × 24 CSS px, com exceções, conforme [W3C — Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- Validar zoom, leitura com leitor de tela, ordem de foco, tamanhos de texto e interação por teclado no produto integrado.
- Manter anúncios concisos e evitar anunciar a cada movimento do slider; consultar [W3C — Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).
- O estado de erro já fornece uma mensagem, mas não bloqueia todas as ações relacionadas ao resultado anterior.

## 13. Implementação e componentes sugeridos

Esta divisão é uma proposta de arquitetura para a aplicação; não uma dependência de framework do protótipo.

```text
CoffeeLoversApp
  SiteHeader
    Brand
    MainNavigation
  PreparePage
    Intro
    RecipeForm
      MethodSelect
      GrainSelect
      WaterInput
      WaterSlider
      IntensityControl
    RecipeResult
    PreparationGuide
    DiscoveryLinks
  MethodsPage
    MethodCard
  GrainsPage
    GrainCard
    SpeciesNote
  GrainDetailPage
    Breadcrumb
    GrainHero
    SensoryProfile
    EditorialContent
    InformationAccordion
    SuggestedMethods
  SiteFooter
```

Manter conteúdo, estado da receita e apresentação separados. Tratar a intensidade como enum e o volume como número validado. Não depender do nome exibido do grão como identificador definitivo: adotar IDs estáveis ao integrar o conteúdo real.

Sugestão de rotas para a implementação: `/`, `/metodos`, `/graos`, `/graos/:slug`. O protótipo alterna visibilidade de painéis, sem alterar a URL nem adicionar entradas ao histórico. Para deep links e Voltar do navegador, implementar roteamento real.

O projeto é independente de framework. É possível transpor seus componentes para React, Vue, Svelte ou outra stack, preservando a semântica e as regras de estado. O estilo atual é escopado em `#coffee-next`; se esse ID for removido, a estratégia de escopo deve ser atualizada.

### 13.1 Compatibilidade e recursos usados

- CSS Grid e Flexbox.
- Container queries nomeadas e `container-type: inline-size`.
- `light-dark()` com `color-scheme`.
- `accent-color`, `overflow: clip`, `minmax()`, propriedades personalizadas.
- `details`/`summary`, atributo `hidden` e controles HTML nativos.
- JavaScript com `replaceChildren`, `dataset`, `Object.entries`, optional chaining na biblioteca e `Intl`/`toLocaleString`.

Verificar suporte na matriz de navegadores do projeto. Para navegadores legados, criar uma estratégia específica para temas e responsividade. Não há polyfills no pacote.

### 13.2 Dependências externas e licenças

- Ícones Lucide 1.8.0: arquivo local e licença em `licenses/LUCIDE-LICENSE.txt`.
- Google Fonts: DM Sans e Fraunces; a requisição está no topo de `styles.css`, com `display=swap`.
- O protótipo não realiza chamadas a APIs de negócio, não transmite entradas do formulário e não inclui analytics.
- Os links editoriais são referências externas abertas somente por ação do usuário.

## 14. Entrega e validação

Foram conferidos estrutura do arquivo, IDs, ligações de rótulos, seletores usados pelo JavaScript, sintaxe dos scripts, referências do pacote, integridade do ZIP e valores extraídos para documentação.

A abertura automatizada de arquivos locais foi bloqueada pelo ambiente de navegação. Por isso, esta exportação não recebeu uma nova revisão visual automatizada nem uma bateria de testes de navegador. A tabela de contraste é uma verificação matemática independente, não um resultado de auditoria integral da interface.

Antes de integrar, conferir pelo menos larguras de 320, 350, 390, 570, 760 e 1100 CSS px do contêiner, incluindo os pontos imediatamente acima dos limites; os dois temas; nome de grão longo; erro no volume; seleção de Moka; fluxo catálogo → detalhe → receita; e retorno por teclado.

### 14.1 Ajustes específicos da exportação

- A página inicial do arquivo é Preparar; a última prévia da conversa abria Bourbon para demonstrar o novo conteúdo.
- Os controles de apresentação do aplicativo foram substituídos por seletores locais de aparência e largura.
- Os ícones foram incorporados ao pacote para evitar dependência de rede para carregá-los.
- O slider foi ajustado de passo 10 para passo 1 ml, para manter sincronização exata com o campo numérico.
- A proposta original da conversa permanece como referência separada.

## 15. Referência exaustiva

O inventário `docs/css-reference.json` contém **226 blocos de regras**, na ordem do CSS. Cada entrada registra contexto, seletor e lista de propriedades/valores. O mesmo arquivo inclui os estilos inline presentes no HTML. Isso permite consultar os detalhes que não cabem nas tabelas resumidas, inclusive margens de 2–9 px, alinhamentos, min-width, display, pseudo-elementos e regras por estado.

`docs/design-tokens.json` é um inventário JSON próprio desta entrega; não declara conformidade com um formato padronizado de tokens. As escalas registradas são valores existentes. Nomes de papéis e a arquitetura sugerida neste documento não implicam que todos já existam como variáveis CSS.

Para manter a documentação consistente ao evoluir o produto, atualizar juntos os tokens, os estilos, as regras de interação e as referências de componentes. Ao alterar a paleta, recalcular as combinações de texto e fundo que o componente realmente utiliza.
