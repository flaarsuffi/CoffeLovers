# CoffeLovers AI Agents — Setup & Usage

Este é o pipeline de IA que gera conteúdo para a plataforma CoffeLovers.

## 📋 O que faz?

3 agentes encadeados que transformam pesquisa em conteúdo de qualidade:

1. **Researcher** — Pesquisa informações sobre grãos e métodos
2. **Writer** — Transforma pesquisa em conteúdo com tom casual
3. **Validator** — Checa qualidade (5 critérios) + feedback loops

## 🚀 Instalação

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

Dependências principais:
- `anthropic` — Claude API
- `langgraph` — Orquestração de agentes
- `pydantic` — Validação de dados
- `beautifulsoup4` — Web scraping (futuro)

### 2. Configurar Claude API Key
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

Ou criar arquivo `.env`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Testar instalação
```bash
python -c "from anthropic import Anthropic; print('✅ Anthropic SDK OK')"
python -c "from langgraph.graph import StateGraph; print('✅ LangGraph OK')"
```

## 🎯 Uso Rápido

### Via CLI
```bash
# Processar um grão
python main.py --type bean --name "Arábica Brasileira"

# Processar um método
python main.py --type method --name "V60"

# Com mais retries
python main.py --type bean --name "Arábica" --retries 5
```

### Via Python Code
```python
from workflows.pipeline import run_pipeline

# Run pipeline
result = run_pipeline(
    item_type="bean",
    item_name="Arábica Brasileira",
    max_retries=3
)

# Check result
print(f"Status: {result.final_status}")
print(f"Content approved: {result.validation_feedback.passed}")
```

## 📁 Estrutura do Projeto

```
CoffeLovers/
├── agents/
│   ├── researcher.py      # Pesquisa multi-fonte + consenso
│   ├── writer.py          # Geração de conteúdo
│   ├── validator.py       # Validação + feedback
│   └── __init__.py
├── schemas/
│   ├── models.py          # Pydantic models (estado + outputs)
│   └── __init__.py
├── sources/
│   ├── web_search.py      # Pesquisa web com Claude
│   └── __init__.py
├── workflows/
│   ├── pipeline.py        # LangGraph orchestration
│   └── __init__.py
├── output/                # Resultados salvos aqui
│   ├── bean/
│   │   └── Arabica_Brasileira/
│   │       ├── state.json
│   │       ├── research.json
│   │       ├── content.json
│   │       └── validation.json
│   └── method/
│       └── V60/
│           └── ...
├── main.py                # CLI entry point
├── requirements.txt       # Dependências Python
├── LANGGRAPH_GUIDE.md     # Guia sobre LangGraph
└── AGENTS_README.md       # Este arquivo
```

## 🔄 Fluxo da Pipeline

```
INPUT: {type: "bean", name: "Arábica"}
  ↓
[RESEARCHER]
  • Claude pesquisa: origem, sabor, métodos
  • Retorna: research_output com confidence_score
  ↓
[WRITER]
  • Claude redige: 4 seções + receita + quiz (8q)
  • Tom casual: "como um barista amigável"
  • Retorna: content_output com sections
  ↓
[VALIDATOR]
  • Claude checa 5 critérios:
    1. TONE (casual, sem jargão)
    2. FACTUAL_ACCURACY (vs research)
    3. COMPLETENESS (todas seções)
    4. GRAMMAR (português correto)
    5. ACCESSIBILITY (compreensível)
  
  ├─ ✅ PASSOU → FIM (salva resultado)
  └─ ❌ FALHOU → RETRY (volta para Writer ou Researcher)
       └─ Max 3 retries → Escalação manual
```

## 📊 Exemplo de Saída

### Estrutura de Resultado
```json
{
  "item_name": "Arábica Brasileira",
  "item_type": "bean",
  "research_output": {
    "origin": "Brasil, Minas Gerais, 1000-1200m",
    "flavor_profile": "Chocolate, nozes, doce",
    "recommended_methods": ["V60", "French Press", "Coador"],
    "confidence_score": 0.92
  },
  "content_output": {
    "sections": [
      {"title": "Origem & História", "content": "..."},
      {"title": "Sabor & Sensação", "content": "..."},
      {"title": "Como Preparar", "content": "..."},
      {"title": "Receita Simples Sugerida", "content": "..."}
    ],
    "recipe": {
      "ingredients": ["Café (20g)", "Água (300ml)"],
      "steps": [...],
      "estimated_time_minutes": 5
    }
  },
  "validation_feedback": {
    "passed": true,
    "criteria_results": [
      {"criterion": "tone", "passed": true},
      {"criterion": "factual_accuracy", "passed": true},
      ...
    ]
  }
}
```

## 🛠️ Customização

### Ajustar Tom
```python
# Em agents/writer.py, line ~10
BEAN_TEMPLATE = """
Você é um barista AMIGÁVEL...  # Customizar aqui
"""
```

### Adicionar Novos Critérios
```python
# Em schemas/models.py
class ValidatorCriterion(Enum):
    TONE = "tone"
    # ... add new criteria here
```

### Mudar Modelo Claude
```python
# Em agents/researcher.py, line ~50
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",  # Change this
    ...
)
```

## 🧪 Testing

### Teste Manual (Rápido)
```bash
python main.py --type bean --name "Robusta" --retries 1
```

### Teste Completo (com logs)
```bash
python main.py --type method --name "Aeropress" --verbose
```

### Teste Python
```python
from workflows.pipeline import run_pipeline

result = run_pipeline("bean", "Robusta")
assert result.validation_feedback.passed, "Validation failed!"
print("✅ Test passed")
```

## 📈 Monitoramento

Cada execução gera arquivos em `output/[type]/[name]/`:
- `state.json` — Estado completo da pipeline
- `research.json` — Output do pesquisador
- `content.json` — Conteúdo gerado
- `validation.json` — Feedback da validação

Para monitorar:
```bash
# Ver resultados do último teste
ls -la output/bean/
cat output/bean/*/validation.json | jq .passed
```

## ⚠️ Troubleshooting

### Erro: "API Key não encontrada"
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Erro: "LangGraph import failed"
```bash
pip install langgraph --upgrade
```

### Validação sempre falha
- Checar se o tone das prompts está muito técnico
- Aumentar max_retries (padrão: 3)
- Revisar feedback de validation.json

### Pesquisa retorna dados vazios
- O modelo Claude precisa mais contexto
- Adicionar mais detalhes à query
- Testar com um nome mais comum primeiro

## 📚 Próximos Passos

- [ ] Escalar para 10 grãos + 5-6 métodos
- [ ] Adicionar banco de dados (salvar history)
- [ ] Integração com site (POST /content)
- [ ] Dashboard de monitoramento
- [ ] CI/CD automation

## 🤝 Contribuindo

Para rodar testes locais:
```bash
python -m pytest tests/ -v
```

Para rodar linter:
```bash
black agents/ schemas/ workflows/
```

## 📞 Suporte

Se tiver problemas:
1. Checar logs em `output/[type]/[name]/validation.json`
2. Aumentar verbosidade com `--verbose`
3. Revisar LANGGRAPH_GUIDE.md

---

**Versão:** 0.1 (Pilot)  
**Status:** ✅ Pronto para teste com 1 bean + 1 método
