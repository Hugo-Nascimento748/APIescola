# API Simples de Alunos com PostgreSQL

Este projeto é uma **API de linha de comando** para inserir dados de alunos em um banco de dados PostgreSQL. Ele utiliza Node.js, o pacote `pg` para conexão com o banco e `readline-sync` para interatividade no terminal.  

---

## Pré-requisitos

- Node.js instalado (versão 14+ recomendada)
- PostgreSQL com o banco `db_profedu` criado
- Tabela `ALUNO` existente com a estrutura mínima:

```sql
CREATE TABLE ALUNO (
    NOME VARCHAR(100),
    SERIE VARCHAR(10),
    IDADE INT,
    MEDIA FLOAT
);
npm install pg readline-sync
