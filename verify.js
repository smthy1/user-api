import client from "./database.js";

async function verifyExistingUsername(username) {
    const query = `
        SELECT * FROM users
        WHERE username = $1
    `;

    try {
        const result = await client.query(query, [username]);

        if (result.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Erro ao verificar:', err);
    }
}

async function verifyExistingEmail(email) {
    const query = `
        SELECT * FROM users
        WHERE email = $1
    `;

    try {
        const result = await client.query(query, [email]);

        if (result.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Erro ao verificar:', err);
    }
}


export  { verifyExistingUsername, verifyExistingEmail };