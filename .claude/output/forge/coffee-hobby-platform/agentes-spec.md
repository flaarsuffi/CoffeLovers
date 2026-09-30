# Agentes de IA — CoffeLovers

## Visão Geral
Fluxo encadeado de 3 agentes que produzem conteúdo para o site de forma automática:
**Pesquisador → Redator → Validador** (com feedback loop)

---

## 1. Agente Pesquisador

### Responsabilidade
Pesquisar informações sobre grãos e métodos na internet (fontes nacionais e internacionais).

### Escopo
- **Um item por vez** (um grão OU um método) para qualidade
- Mínimo **3 fontes diferentes** por item
- Informações úteis para **entusiasta caseiro** (não barista profissional)

### Output — Estrutura para GRÃO
- **Origem:** país, região, altitude (se aplicável)
- **Perfil de Sabor:** notas predominantes, corpo, acidez
- **Métodos Recomendados:** 2-3 dos 5-6 que existem

### Output — Estrutura para MÉTODO
- **Tutorial:** passo a passo
- **Equipamentos:** lista do que é necessário
- **Dicas Técnicas:** temperatura, tempo, proporcionalidade (PRECISO ser exato)
- **Variações:** 2-3 formas diferentes de usar o método

### Tratamento de Dados Conflitantes
- Se 3+ fontes discordam (ex: temperatura): **usa o dado que se repete mais** (consenso)
- Se não houver consenso: marca como "intervalo" (ex: "195-200°C")

### Formato de Entrega
Texto estruturado em seções, claro e bem organizado.

---

## 2. Agente Redator

### Responsabilidade
Receber pesquisa bruta e transformar em conteúdo para o site usando **tom casual e amigável**.

### Processo
1. Recebe output do pesquisador
2. Segue template de seções
3. Redige em linguagem acessível (não técnica demais)
4. Gera também perguntas do quiz
5. Entrega para validador

### Template — Página de GRÃO
- **Origem/História**
- **Perfil de Sabor**
- **Como Preparar** (liga aos métodos recomendados)
- **Receita Sugerida** (simples, breve, menos técnico)

### Template — Página de MÉTODO
- **Tutorial** (passo a passo)
- **Equipamentos Necessários**
- **Dicas Técnicas** (temperatura, tempo, proporcionalidade)
- **Variações/Receitas**

### Quiz
- Redator redige as **8 perguntas fixas** baseadas na pesquisa
- Perguntas genéricas sobre: nível de conhecimento, paladar, tempo disponível
- Cada pergunta tem 3-4 opções de resposta

### Receita Sugerida
- Simples e breve (não tão técnico quanto método de preparo)
- Ingredientes, passo a passo, tempo

### Formato de Entrega
HTML/Markdown pronto para publicar, com seções bem definidas.

---

## 3. Agente Validador

### Responsabilidade
Verificar qualidade do conteúdo produzido pelo redator.

### Critérios de Validação
- ✓ **Tom:** casual e amigável (sem jargão excessivo)
- ✓ **Informações:** factualmente corretas (cruza com pesquisa)
- ✓ **Completude:** todas as seções preenchidas
- ✓ **Ortografia/Gramática:** sem erros
- ✓ **Acessibilidade:** conteúdo compreensível para iniciantes

### Feedback
- Se **passa:** aprova e conteúdo segue para publicação
- Se **falha:** reporta **motivo específico** (não apenas "não passou")
  - Exemplo: "Seção 'Como Preparar' muito técnica, usar linguagem mais simples"
  - Redirecion: volta para **redator** (se problema é tom/estrutura) ou **pesquisador** (se informação incorreta)

### Critério de Qualidade
Deve passar em **todos os 5 critérios** para aprovação.

---

## Fluxo Completo

```
Pesquisador (Grão/Método 1)
    ↓
    → Redator
       ↓
       → Validador
          ├─ ✓ APROVADO → Publicação
          └─ ✗ REJEITADO → Volta para Redator ou Pesquisador + Redator
```

---

## Teste Inicial
- **Grão:** escolher 1 grão popular (ex: Arábica Brasileira)
- **Método:** escolher 1 método comum (ex: V60)
- Rodar fluxo completo para validar sistema antes de escalar para 10+6

---

## Decisões Locked
- ✓ 3 agentes encadeados (Pesquisa → Redação → Validação)
- ✓ Mínimo 3 fontes por item
- ✓ Consenso em dados técnicos (usa o mais repetido)
- ✓ Tone: casual & amigável
- ✓ Quiz: 8 perguntas fixas, genéricas
- ✓ Teste com 1 grão + 1 método antes de escalar
