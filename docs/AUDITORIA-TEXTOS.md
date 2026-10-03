# 📋 Auditoria de Textos — CoffeLovers

**Data:** 2026-10-02  
**Responsável:** Writer  
**Status:** Proposta de Melhorias

---

## 🔴 PROBLEMAS ENCONTRADOS

### 1. Home muito minimalista vs. Páginas de detalhe
- **Problema:** Cards educacionais têm 1-2 frases. Páginas de grão/método têm parágrafos, histórias, specs.
- **Impacto:** Desbalanceado. Home parece incompleta perto do resto do site.
- **Severidade:** 🟠 Média

### 2. Uso de "Nossas" / Posse incorreta
- **Problema:** "Nossas Variedades", "Nossos Grãos", "Nossos Métodos"
- **Realidade:** CoffeLovers não produz café, apenas explora e educa. Não "possui" nada.
- **Impacto:** Mensagem confusa. Credibilidade baixa.
- **Severidade:** 🔴 Alta

### 3. Inconsistência de tonalidade
- **Home:** Casual, poético ("história que quer contar")
- **Páginas detalhe:** Formal, técnico ("Altitude", "Produção", "Cafeína")
- **Problema:** Não parecem do mesmo site.
- **Severidade:** 🟠 Média

### 4. Plurais e URLs inconsistentes
- Página: "/graos" mas em dados: "Grao"
- Página: "/metodos" mas em dados: "Metodo"
- Label: "Técnicas Essenciais" mas técnica singular em código
- **Severidade:** 🟡 Baixa (técnica, mas confunde)

### 5. Falta de contexto educacional na home
- **Problema:** Home não explica POR QUE grão e método importam
- **Impacto:** Usuário novo não entende a proposta
- **Severidade:** 🟠 Média

---

## ✅ PROPOSTAS DE MELHORIA

### HOME PAGE

#### ❌ ANTES — Hero
```
Descubra sua proporção perfeita

Cada café merece sua medida. Encontre a proporção exata para extrair o melhor de seu grão.
```

#### ✅ DEPOIS — Hero
```
Descubra sua proporção perfeita

A água e o café formam uma dupla. Encontre a medida exata para seu grão e método, e transforme cada xícara em uma experiência.
```
**Por quê:** Mais contexto. Não é só sobre "proporção", é sobre experiência.

---

#### ❌ ANTES — Cards Educacionais

**O Grão:**
"Origem define tudo. Arábica floral, Bourbon encorpado, Geisha delicado. Escolha a história que quer contar em seu café."

**O Método:**
"Técnica transforma sabor. V60 limpo, Aeropress versátil, French Press intenso. Seu método, sua extração."

#### ✅ DEPOIS — Cards Educacionais

**O Grão:**
"Cada origem traz seu próprio caráter. Arábica oferece notas florais e doces. Bourbon é encorpado com toques de chocolate. Geisha traz delicadeza e aroma único. Explore qual historia você quer extrair de seu café."

**O Método:**
"A técnica de preparo define como o café é extraído. V60 oferece café limpo e brilhante, perfeito para quem quer clareza sensorial. Aeropress é versátil e rápido, ideal para quem tem pouco tempo. French Press entrega corpo intenso, para quem ama profundidade. Escolha o método que combina com seu ritmo."

**Por quê:** 
- Mais educacional (não assume conhecimento prévio)
- Mais específico (não só "floral", explica O QUE é floral)
- Mais motivacional (chama à ação com intenção)

---

### PÁGINAS DE LISTING (/graos, /metodos)

#### ❌ ANTES
- "Nossas Variedades"
- "Métodos de Preparo"

#### ✅ DEPOIS
- "Variedades Exploradas" / "Café que Recomendamos"
- "Métodos Essenciais"

**Por quê:** Remove posse incorreta. CoffeLovers educa, não produz.

---

### PÁGINA DE DETALHE — Grão

#### ❌ ANTES (atual)
- Título: "{grao.flavor.descricao}" (exemplo: "Notas florais e doces")
- Falta: Contexto sobre por que essa variedade importa

#### ✅ DEPOIS
- Adicionar parágrafo de introdução ANTES de "Origem":
  
```
[SEÇÃO NOVA: Sobre este grão]

Arábica é a variedade mais cultivada no mundo. Representa 60-70% do café global. 
Valorizado por seus aromas delicados e acidez interessante, Arábica é a escolha 
de quem quer explorar nuances e complexidade em cada xícara.
```

---

### PÁGINA DE DETALHE — Método

#### ❌ ANTES (atual)
- Título: "{metodo.tagline}" (exemplo: "Controle preciso, café limpo")
- Falta: Por que alguém escolheria ESTE método vs. outro

#### ✅ DEPOIS
- Adicionar parágrafo ANTES de "Técnicas Essenciais":

```
[SEÇÃO NOVA: Por que escolher V60?]

V60 é método de primeira escolha para quem quer controle preciso. 
A forma cônica e os furos específicos garantem uma extração uniforme, 
resultando em café limpo, brilhante e com clareza sensorial. 
Ideal para explorar as nuances do seu grão.
```

---

## 📊 CHECKLIST DE MUDANÇAS

### Imediatas (Textos)
- [ ] Expandir cards educacionais na home (2-3 linhas cada)
- [ ] Mudar "Nossas Variedades" → "Variedades Exploradas"
- [ ] Mudar "Métodos de Preparo" → "Métodos Essenciais"
- [ ] Adicionar intro em cada página de grão (contexto global)
- [ ] Adicionar intro em cada página de método (por que escolher?)

### Médias (Estrutura)
- [ ] Revisar tom em TODAS as seções (padronizar formal vs. casual)
- [ ] Adicionar chamadas-à-ação mais claras (CTA ao final de cards)
- [ ] Expandir "Por que escolher este método" (já existe, mas muito genérico)

### Futuras (Design + Copy)
- [ ] Trazer Designer para melhorar diagrama (emojis → ícones)
- [ ] Expandir hero da home com imagem/ilustração
- [ ] Considerar testimoniais ou stories de usuários

---

## 💡 RECOMENDAÇÕES GERAIS

1. **Tone of Voice:** Escolher UMA tonalidade. Proposto: "Educacional + Premium + Acessível"
   - Educacional: Explica sem pressupor conhecimento
   - Premium: Refere-se a café specialty, não commodity
   - Acessível: Linguagem simples, sem jargão desnecessário

2. **Estrutura de Copy:** 
   - **Home:** O quê + Por quê + Como (call-to-action)
   - **Listing:** Introdução + Cards exploratórios
   - **Detalhe:** Contexto + Técnicas + Story (se houver)

3. **Consistência:** Todas as páginas devem "respirar" igual. Espacing, tamanho de parágrafos, tom.

---

## 📝 PRÓXIMOS PASSOS

1. **Dev:** Implementar mudanças de texto em código
2. **Designer:** Refinar visual (imagens, ícones, spacing)
3. **QA:** Testar responsividade com novos textos (mais longos)
4. **Review:** Verificar se home agora "conversa" com detalhe pages

---

**Status:** Aguardando aprovação para implementação.
