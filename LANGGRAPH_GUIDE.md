# LangGraph — Guia Rápido

## O que é LangGraph?

LangGraph é um framework para orquestrar fluxos de IA com estado persistente e feedback loops. Perfeito para pipelines com múltiplos agentes.

**Sem LangGraph:** você quer encadear agentes manualmente:
```python
research = researcher(item)
content = writer(research)
validation = validator(content, research)
if not validation.passed:
    # ... reescrever, etc... manual
```

**Com LangGraph:** você define um grafo (workflow) e LangGraph gerencia o fluxo:
```
pesquisador → redator → validador
                          ↓
                      passou? ✓ fim
                          ↓
                         ✗ volta pro redator
```

---

## Conceitos Principais

### 1. **StateGraph**
Define um grafo (workflow) com nós (agentes) e arestas (transições).

```python
from langgraph.graph import StateGraph

# StateGraph recebe o tipo de estado (nossa PipelineState)
workflow = StateGraph(PipelineState)

# Adicionar nós
workflow.add_node("researcher", researcher_node)
workflow.add_node("writer", writer_node)
workflow.add_node("validator", validator_node)

# Adicionar arestas (transições)
workflow.add_edge("researcher", "writer")  # Sempre vai de pesq para escrita
workflow.add_conditional_edges(
    "validator",
    decide_next_step  # Função que decide: vai de volta ou termina?
)
```

### 2. **State (PipelineState)**
Um objeto compartilhado que passa entre nós. Todos os agentes leem/escrevem nele.

```python
class PipelineState(BaseModel):
    item_name: str
    research_output: Optional[Dict] = None  # Pesquisador escreve aqui
    content_output: Optional[Dict] = None   # Redator escreve aqui
    validation_feedback: Optional[Dict] = None  # Validador escreve aqui
    retry_count: int = 0
```

### 3. **Nós (Nodes)**
Funções que recebem `state`, processam, e retornam `state` atualizado.

```python
def researcher_node(state: PipelineState) -> PipelineState:
    # Ler do state
    item_name = state.item_name
    
    # Fazer trabalho
    research = do_research(item_name)
    
    # Escrever no state
    state.research_output = research
    return state
```

### 4. **Arestas (Edges)**
Conexões entre nós. Podem ser:
- **Simples:** sempre vai para o próximo
- **Condicionais:** decide para onde ir baseado no state

```python
# Simples: sempre vai para writer
workflow.add_edge("researcher", "writer")

# Condicional: se passou na validação, fim; senão, volta
def decide_next(state: PipelineState):
    if state.validation_feedback.passed:
        return "end"
    else:
        return "writer"  # Volta para reescrever

workflow.add_conditional_edges("validator", decide_next)
```

### 5. **Compile & Run**
Transformar o grafo em executor, depois rodar.

```python
app = workflow.compile()

# Rodando
result = app.invoke({
    "item_type": "bean",
    "item_name": "Arábica Brasileira"
})
```

---

## Fluxo Real: CoffeLovers

```
INPUT: {item_type: "bean", item_name: "Arábica"}

┌──────────────────────────────────────┐
│ START (initialize state)             │
└──────────────┬───────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ RESEARCHER NODE                      │
│ • Pesquisa 3+ fontes                │
│ • Aplica consenso                   │
│ • Escreve: state.research_output    │
└──────────────┬───────────────────────┘
               │ always go to writer
┌──────────────▼──────────────────────┐
│ WRITER NODE                          │
│ • Lê state.research_output          │
│ • Aplica template + tone            │
│ • Escreve: state.content_output     │
└──────────────┬───────────────────────┘
               │ always go to validator
┌──────────────▼──────────────────────┐
│ VALIDATOR NODE                       │
│ • Lê state.content_output           │
│ • Checa 5 critérios                 │
│ • Escreve: state.validation_feedback│
└──────────────┬───────────────────────┘
               │
         ┌─────┴──────────┐
         │                │
      PASSED?          FAILED?
         │                │
         ▼                │
      ┌─┐                 │
      │E│                 │
      │N│                 │
      │D│                 │
      └─┘                 │
                          │
                    ┌─────▼──────────┐
                    │ WRITER (retry)  │ (max 3 times)
                    └─────┬───────────┘
                          │
                          ▼ (volta pra validação)
```

---

## Exemplo Simples: 2 Nós

```python
from langgraph.graph import StateGraph
from pydantic import BaseModel

class SimpleState(BaseModel):
    name: str
    message: str = ""

# 1. Definir nós (funções)
def node_a(state: SimpleState) -> SimpleState:
    state.message = f"Hello {state.name}"
    return state

def node_b(state: SimpleState) -> SimpleState:
    state.message += "! How are you?"
    return state

# 2. Criar workflow
workflow = StateGraph(SimpleState)
workflow.add_node("a", node_a)
workflow.add_node("b", node_b)
workflow.add_edge("a", "b")
workflow.set_entry_point("a")
workflow.set_finish_point("b")

# 3. Compilar e rodar
app = workflow.compile()
result = app.invoke({"name": "Alice"})
print(result.message)  # "Hello Alice! How are you?"
```

---

## Próximos Passos

1. Vamos implementar os 3 nós (researcher, writer, validator)
2. Vamos usar LangGraph para conectá-los
3. Vamos testar com 1 bean + 1 method
4. Se passar, escala para 10+6

**Key Point:** LangGraph gerencia o retry loop automaticamente via `conditional_edges`.

Pronto? Vamo pro Researcher Agent!
