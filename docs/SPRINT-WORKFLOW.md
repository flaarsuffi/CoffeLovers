# Fluxo de sprint

Toda sprint passa por quatro etapas, nesta ordem. Só depois da quarta ela é
considerada pronta.

## 1. Dev

Implementar a funcionalidade. Build compilando e tipos válidos antes de passar
adiante.

## 2. QA

Validar o que foi feito:

- Comportamento em mobile, tablet e desktop
- Cálculos e casos de borda
- Acessibilidade: rótulos, navegação por teclado, foco, contraste
- Aderência ao design system

## 3. Code review

Revisar o código em busca de:

- Tipos corretos e lógica sólida
- Regressões
- Cobertura de teste do que é sutil
- Débitos introduzidos — e declará-los, em vez de escondê-los

## 4. Commit

Só depois das três etapas acima passarem. A mensagem explica **por que** a
mudança existe, não o que o diff já mostra.

---

## Regras

**Não pular etapas.** Mudança pequena também passa por QA.

**Declarar o que ficou para trás.** Débito conhecido e documentado é aceitável;
débito silencioso não.

**Aprovação antes do commit.** O commit acontece depois do aval, não antes.
