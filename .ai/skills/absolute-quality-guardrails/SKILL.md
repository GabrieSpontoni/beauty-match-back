# Skill: absolute-quality-guardrails

## Objetivo
Aplicar as duas verdades absolutas do repositorio em toda tarefa:
1. cobertura global de testes unitarios em 100% (statements, branches, functions e lines)
2. nenhum arquivo/componente de producao com mais de 200 linhas de codigo

## Quando usar
- sempre que houver alteracao de codigo de producao
- obrigatoria antes de concluir PR ou commit

## Fluxo obrigatorio
1. medir tamanho dos arquivos alterados
2. se qualquer arquivo de producao estiver acima de 200 linhas, refatorar antes de seguir
3. criar/ajustar testes unitarios para cobrir todas as linhas e ramificacoes relevantes
4. rodar `npm run lint`
5. rodar `npm run test`
6. rodar `npm run build`
7. confirmar cobertura global em 100%

## Regras de decisao
- nao reduzir threshold de cobertura para destravar entrega
- nao adiar refatoracao de arquivo > 200 linhas para tarefa futura
- se refatoracao impactar contratos, atualizar docs no mesmo trabalho

## Definicao de pronto
- zero arquivos de producao acima de 200 linhas
- cobertura global unitaria em 100%
- lint, test e build passando
