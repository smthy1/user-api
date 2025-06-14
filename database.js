import 'dotenv/config';
import { Client } from 'pg';

const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
});

await client.connect();


async function createUsersTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );
    `
    try {
        await client.query(sql);
        console.log('Tabela "users" criada com sucesso.');
    } catch (err) {
        console.error('Erro ao criar tabela: ', err);
    }
}

export default client;
export { createUsersTable };