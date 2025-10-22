"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const readlineSync = require('readline-sync');
const dbConfig = {
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
};
const pool = new Pool(dbConfig);
async function inserirDados() {
    console.log("Tratamento de Aluno...");
    const nome = readlineSync.question('Digite o nome: ');
    const serie = readlineSync.question('Digite a série: ');
    const idade = readlineSync.questionInt('Digite a idade: ');
    const notaMat = readlineSync.questionFloat('Digite a nota de matemática: ');
    const notaGeo = readlineSync.questionFloat('Digite a nota de geografia: ');
    const notaHis = readlineSync.questionFloat('Digite a nota de história: ');
    const media = (notaGeo + notaHis + notaMat) / 3;
    if (!nome || !serie || !idade || !notaGeo || !notaHis || !notaMat) {
        console.log("Erro: Todos os campos devem ser preenchidos! Operação cancelada!");
        await pool.end();
        return;
    }
    try {
        console.log("\nLigando ao Banco de Dados...");
        const client = await pool.connect();
        console.log("Conexão bem-sucedida! Inserindo dados...");
        const insertQuery = `
            INSERT INTO public.ALUNO (NOME, SERIE, IDADE, MEDIA)
            VALUES ($1, $2, $3, $4)
            `;
        const valores = [nome, serie, idade, media];
        await client.query(insertQuery, valores);
        client.release();
        console.log("---------------------------------------------------------------");
        console.log("Dados inseridos com sucesso!");
        console.log(`Nome: ${nome}, Série: ${serie}, Idade: ${idade}, Média: ${media} `);
        console.log("---------------------------------------------------------------");
    }
    catch (error) {
        console.error("Ocorreu um erro ao interagir com o banco de dados:", error);
    }
    finally {
        await pool.end();
        console.log("Conexão com o banco de dados encerrada.");
    }
}
inserirDados();
