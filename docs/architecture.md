# Arquitetura - beauty-match-back

## Objetivo
Base limpa para evolucao incremental da API do Beauty Match com NestJS.

## Principios
- modularizacao por dominio
- contratos HTTP estaveis e versionaveis
- testes unitarios obrigatorios para logica de negocio
- cobertura como gate de qualidade

## Modulos iniciais
- `app`: healthcheck e bootstrap

## Evolucao sugerida
- adicionar modulo `auth`
- adicionar persistencia (Mongo + Mongoose)
- formalizar contratos no Swagger por dominio
