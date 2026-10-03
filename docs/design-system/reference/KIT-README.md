# CoffeeLovers — protótipo e design system v1.0

Abra `index.html` diretamente no navegador. Não exige instalação, servidor ou compilação.

## Arquivos

- `index.html`: estrutura do protótipo.
- `assets/styles.css`: todos os estilos do produto, organizados por seletor.
- `assets/data.js`: métodos, grãos, textos e dados das receitas de demonstração.
- `assets/app.js`: navegação e interações locais.
- `assets/prototype-shell.css` e `assets/prototype-controls.js`: barra de apresentação, fora do produto.
- `assets/lucide.min.js`: biblioteca local de ícones, versão 1.8.0, licença ISC.
- `docs/design-system.md` e `docs/design-system.html`: documentação completa.
- `docs/design-tokens.json`: cores, medidas e escalas extraídas.
- `docs/css-reference.json`: todas as declarações CSS e estilos inline, preservando a ordem da cascata.
- `docs/contrast-reference.json`: contrastes calculados de combinações selecionadas.
- `licenses/LUCIDE-LICENSE.txt`: licença da biblioteca de ícones incluída.

## Como explorar

A página abre em Preparar. Navegue por Métodos e Grãos. Nos grãos, Conhecer abre o conteúdo completo. Preparar com este grão e os métodos do painel lateral preenchem a calculadora. A barra externa permite alternar tema e simular 390 px.

## Dependências e limites

O HTML, as interações e os ícones funcionam sem internet. As fontes DM Sans e Fraunces vêm do Google Fonts; sem conexão, são substituídas por Arial e Georgia. Para fidelidade tipográfica offline, hospede as fontes localmente e substitua o @import por @font-face.

O protótipo usa JavaScript simples, container queries e light-dark(). O visual deve ser conferido nos navegadores da aplicação. O conteúdo foi preparado para demonstrar a estrutura; não é uma migração integral dos textos originais. Revisar receitas e conteúdo editorial antes de publicar.

Estado fica em memória e se perde ao recarregar. Sem backend, autenticação, analytics, persistência ou rotas reais. A simulação de largura não é emulação de um aparelho.

## Como codar a partir dele

Leia primeiro docs/design-system.md. Reaproveite os tokens, divida os componentes segundo o mapa do documento e conecte os dados reais do projeto. A barra externa de apresentação não faz parte do produto.

## Verificação desta entrega

Exportação, estrutura, IDs, referências, conteúdo do pacote e sintaxe JavaScript validados. Não foi feita validação visual automatizada desta exportação: o ambiente de navegação bloqueou a abertura de arquivos locais. Não há declaração de conformidade integral WCAG.
