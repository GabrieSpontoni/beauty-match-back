# AGENTS.md (beauty-match-back)

Scope: `beauty-match-back/**`
Purpose: `AI entrypoint`

Skill catalog:
- `.ai/skills/base-repo-governance/SKILL.md`
- `.ai/skills/absolute-quality-guardrails/SKILL.md`

Load order:
1. `.ai/rules/00-global.md`
2. `.ai/rules/10-architecture.md`
3. `.ai/rules/20-modules-and-layout.md`
4. `.ai/rules/30-quality-gates.md`
5. `.ai/rules/40-refactor-backlog.md`

Local precedence:
- para arquivos em `src/**`, carregar `src/AGENTS.md` apos este arquivo
- se houver conflito, regra mais local vence

Verdades absolutas do repositorio:
- testes unitarios devem manter 100% de cobertura global (statements, branches, functions e lines)
- nenhum arquivo/componente de producao pode ultrapassar 200 linhas de codigo
