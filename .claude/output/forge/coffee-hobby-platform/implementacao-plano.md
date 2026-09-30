# Plano de Implementação — Agentes IA CoffeLovers

## Tech Stack Recomendado

| Componente | Escolha | Por quê |
|-----------|---------|--------|
| **LLM** | Claude 3.5 Sonnet | Melhor em reasoning, português, tone consistency |
| **Orquestração** | LangGraph | Estado clean, feedback loops, memory |
| **Linguagem** | Python 3.10+ | Asyncio para multi-source paralelo |
| **Web Scraping** | BeautifulSoup4 + httpx | Extração robusta, deduplicação |
| **Validação** | Pydantic | Schemas tipadas, output enforcement |
| **Storage** | JSON (escala depois para DB) | Simples, audit trail |

---

## Ordem de Implementação (4-5 semanas)

### **Semana 1: Foundation**
- [ ] Setup project (pastas: `/agents`, `/schemas`, `/workflows`, `/sources`, `/storage`, `/config`, `/tests`)
- [ ] Definir data schemas (Pydantic models para cada agente)
- [ ] Selecionar + validar 5-10 sources de café em português/inglês

### **Semana 2: Researcher Agent** ⭐ **CRÍTICO**
- [ ] Implementar multi-source querying (3+ fontes por item)
- [ ] Lógica de consenso (usa dado que se repete mais)
- [ ] Scoring de confiança (high/medium/low baseado em # de fontes)
- [ ] Web scraper para extração + limpeza de dados
- [ ] Output: JSON estruturado com trail de sources

**Exemplo de saída:**
```json
{
  "item": "V60",
  "type": "method",
  "temperature": {
    "consensus": "195-200°C",
    "sources": ["site_A: 195°C", "site_B: 198°C", "site_C: 200°C"],
    "confidence": "high"
  }
}
```

### **Semana 3: Writer Agent**
- [ ] Aplicar transformação de tom (casual, amigável, sem jargão)
- [ ] Implementar templates por tipo (grão vs método)
- [ ] Gerar 8 perguntas do quiz (estrutura fixa, genéricas)
- [ ] Criar receita sugerida (simples, breve)
- [ ] Output: Markdown/HTML estruturado com metadata

**Template — Página de Grão:**
1. Origem & História
2. Sabor & Sensação
3. Como Preparar (links para métodos)
4. Receita Simples Sugerida

**Template — Página de Método:**
1. Modo de Fazer (passo a passo)
2. O Que Você Vai Precisar (equipamentos)
3. Dicas de Mestre (técnica + temperatura + tempo)
4. Variações & Receitas

### **Semana 4: Validator Agent** ⭐ **FEEDBACK LOOP**
- [ ] 5 critérios de validação:
  1. **Tone:** sem jargão excessivo, casual
  2. **Factualidade:** compara com research sources
  3. **Completude:** todas as seções preenchidas
  4. **Gramática/Ortografia:** português correto
  5. **Acessibilidade:** compreensível para iniciantes
- [ ] Feedback estruturado (especifica problema + sugestão)
- [ ] Routing: volta para Writer (tom/estrutura) ou Researcher (factual)
- [ ] Max 3 retries por item (depois escalação manual)

**Feedback loop:**
```
Pesquisador → Redator → Validador
                           ├─ ✓ APROVADO
                           └─ ✗ REJEITADO (volta para Redator ou Pesquisador)
```

### **Semana 5: Pilot + Refinement**
- [ ] Teste com 1 grão popular (ex: Arábica Brasileira)
- [ ] Teste com 1 método comum (ex: V60)
- [ ] Validar pipeline end-to-end
- [ ] Ajustar prompts/lógica baseado em resultados
- [ ] Documentar learnings

---

## Arquitetura de Dados

```
INPUT: Nome do grão/método
  ↓
[RESEARCHER] 
  • Query 3+ sources
  • Extract + clean
  • Consensus logic
  • Score confidence
  ↓
ResearchOutput JSON
  ↓
[WRITER]
  • Apply casual tone
  • Fill template sections
  • Generate quiz (8 q)
  • Create recipe
  ↓
ContentOutput (Markdown/HTML)
  ↓
[VALIDATOR]
  • Check 5 criteria
  • Cross-reference sources
  • Generate feedback
  ↓
PASS ✓ → Publish
FAIL ✗ → Feedback loop
```

---

## Arquivos Críticos (Implementar Nessa Ordem)

### 1️⃣ `/schemas/models.py` — Data Contracts
```python
class BeanResearchOutput(BaseModel):
    origin: str
    flavor_profile: str
    recommended_methods: List[str]
    sources_used: List[Dict]

class MethodResearchOutput(BaseModel):
    tutorial_steps: List[str]
    equipment: List[str]
    technical_tips: Dict  # temp, time, ratio
    variations: List[str]
    sources_used: List[Dict]

class ValidationFeedback(BaseModel):
    passed: bool
    criteria_results: List[Dict]  # tone, factual, complete, grammar, accessibility
    target_agent: str  # "writer" or "researcher"
```

### 2️⃣ `/agents/researcher.py` — Multi-source Research
- ResearcherAgent class
- Consensus algorithm (use dado com mais repetições)
- Source credibility weighting
- Fallback logic (se source falha, try next)

### 3️⃣ `/agents/writer.py` — Content Generation
- WriterAgent class
- Template application (grão vs método)
- Tone transformation ("escreva como barista amigável")
- Quiz generation (8 perguntas fixas)

### 4️⃣ `/agents/validator.py` — Quality Check
- ValidatorAgent class
- 5-criterion checker
- Feedback formatter (específico, actionable)
- Routing logic (voltar para qual agente?)

### 5️⃣ `/workflows/orchestration.py` — Main Pipeline
- Orchestrator class
- State management (item → research → content → validation)
- Feedback loop handling
- Error recovery + retry logic (max 3)

### 6️⃣ `/sources/scraper.py` — Web Scraper
- Multi-source querying
- Content extraction (BeautifulSoup)
- Deduplication (mesmo fato de diferentes sources)
- Source ranking (qual é mais confiável?)

### 7️⃣ `/config/prompts.py` — Prompt Engineering
- System prompts para cada agente
- Tone guidelines (português, casual)
- Validation rubric
- Quiz question templates

### 8️⃣ `/tests/test_pilot.py` — Integration Tests
- Mock sources (evitar rate limiting)
- Test case 1: Arábica Brasileira
- Test case 2: V60
- Assertions: schema valid, no hallucination, tone correct

### 9️⃣ `/main.py` — CLI Entry Point
```bash
python main.py --type bean --name "Arábica Brasileira"
python main.py --type method --name "V60"
# Output: /output/[bean|method]/[name]/
```

---

## Cronograma & Esforço

| Tarefa | Semana | Dias | Esforço | Crítico |
|--------|--------|------|--------|---------|
| Setup + schemas | 1 | 3 | 5 pts | ✓ |
| Researcher core | 2 | 4 | 8 pts | ✓ |
| Scraper web | 2 | 3 | 6 pts | ✓ |
| Writer agent | 3 | 3 | 6 pts | ✓ |
| Quiz generation | 3 | 2 | 4 pts | |
| Validator agent | 4 | 3 | 7 pts | ✓ |
| Feedback loop | 4 | 2 | 4 pts | ✓ |
| Pilot testing | 5 | 5 | 8 pts | ✓ |
| **TOTAL** | | **27 dias** | **51 pts** | |

**Timeline realista: 4-5 semanas** (com 1-2 dev, buffer para testes)

---

## Critérios de Sucesso por Agente

### Researcher Agent ✓
- [ ] Recupera dados de 3+ sources distintas
- [ ] Aplica consenso corretamente (fato aparece em 2+ = confidence score)
- [ ] Maneja dados faltantes/conflitantes (ranges, fallbacks)
- [ ] Output schema-validated JSON
- [ ] Provides audit trail (qual source falou o quê)
- [ ] Processa bean/método em &lt; 2 min

### Writer Agent ✓
- [ ] Transforma research em tom casual (0 jargão excessivo)
- [ ] Preenche TODAS as seções do template
- [ ] Gera 8 quiz questions válidas (português correto)
- [ ] Cria receita sugerida
- [ ] Não hallucina informações (mantém accuracy)
- [ ] Output Markdown/HTML válido
- [ ] Processa em &lt; 1 min

### Validator Agent ✓
- [ ] Identifica violações de tone (flagg jargão, ton formal)
- [ ] Cross-referencia factualidade vs. sources
- [ ] Detecta seções faltantes
- [ ] Flagg erros ortográficos (português)
- [ ] Avalia acessibilidade (reading level check)
- [ ] Feedback específico, actionable
- [ ] Roteia corretamente (writer vs researcher)
- [ ] Processa em &lt; 1 min

### Pipeline Geral ✓
- [ ] Ciclo completo (bean ou método) em &lt; 10 min
- [ ] Taxa de sucesso no pilot: 100% (após max 2 retries)
- [ ] Audit trail: cada iteração registrada
- [ ] Error handling: graceful degradation

---

## Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Consenso falha (sources conflitantes) | Média | Alto | Fallback para range; flag manual review |
| Writer hallucina fatos | Média | Alto | Validator fact-check; iteração refinada |
| Tone em português fraco | Média | Médio | Revisor português para primeiros 5; refinar rubric |
| Rate limits API Claude | Baixa | Médio | Caching de requests; queue-based processing |
| Loop infinito de retry | Baixa | Alto | Max 3 retries; escalação manual se excede |
| Sections do template vazias | Baixa | Médio | Schema validation + Validator checks completude |

---

## Próximos Passos

### Imediato
1. **Finalizar tech stack** (confirmar Claude 3.5 Sonnet, LangGraph)
2. **Identificar 5-10 sources de café** (portuguesas + internacionais)
3. **Começar com `/schemas`** (Pydantic models — base para tudo)

### Semana 1
4. Setup project structure + CI/CD
5. Lock data schemas
6. Validar sources selecionadas

### Semana 2
7. Implementar Researcher Agent
8. Build web scraper
9. Testar logic de consenso

---

## Decisões Locked
✓ Python + Claude SDK + LangGraph  
✓ 3 agentes encadeados (Pesquisa → Redação → Validação)  
✓ Consenso = dado que se repete em 3+ sources  
✓ Max 3 retries, depois escalação manual  
✓ Pilot com 1 grão + 1 método  
✓ Escalar para 10+6 depois de validar pipeline  
