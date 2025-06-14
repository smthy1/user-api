import client from "./database.js";
import { verifyExistingEmail, verifyExistingUsername } from "./verify.js";
import bcrypt from 'bcrypt';

async function createUser(username, email, password) {
    const resultUsername = await verifyExistingUsername(username);
    const resultEmail = await verifyExistingEmail(email);

    if (resultUsername && resultEmail === true) {
        return {"msg": "Usuário e e-mail já cadastrados."};
    } else if (resultEmail === true) {
        return {"msg": "E-mail já cadastrado."};
    } else if (resultUsername === true) {
        return {"msg": "Usuário já cadastrado."};
    } else {
        const query =`
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        const hashed = await bcrypt.hash(password, 10)
        try {
            await client.query(query, [username, email, hashed]);
        } catch (err) {
            console.error(err);
        }
    }
}


async function login(username, password) {
    const query = `
        SELECT * FROM users
        WHERE username = $1
    `;
    
    try {
       const resultPassword = await client.query(query, [username]);
       const hashedPassword = resultPassword.rows[0].password;

       const comparePassword = await bcrypt.compare(password, hashedPassword);
        return comparePassword;
    } catch (err) {
        console.error(err);
    }
}


async function deleteUser(username, password) {
    try {
        const result = await login(username, password);

        if (result === true) {
            const query = `
                DELETE FROM users
                WHERE username = $1
            `;
            await client.query(query, [username]);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}


async function updateUsername(currentUsername, newUsername, password) {
    try {
        //first verify if the user exists
        const result = await login(currentUsername, password);
        
        //uptade the username
        if(result === true) {
            const query = `
                UPDATE users
                SET username = $1
                WHERE username = $2
                RETURNING *;
            `;
            await client.query(query, [newUsername, currentUsername]);

            return true;
        } else {
            return false;
        }
        
    } catch (err) {
        console.error(err);
    }
}


async function updatePassword(newPassword, currentPassword, email) {
    try {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;
        const result = await client.query(query, [email]);
        const hashedPassword = result.rows[0].password;

        const comparePassword = await bcrypt.compare(currentPassword, hashedPassword);
        
        if (comparePassword === true) {
            const sendNewPassword = `
                UPDATE users
                SET password = $1
                WHERE password = $2
                RETURNING *;
            `;

            await client.query(sendNewPassword, [newPassword, currentPassword]);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}

export { createUser, login, updateUsername, deleteUser, updatePassword };