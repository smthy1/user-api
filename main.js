import 'dotenv/config';
import express from 'express';
import { createUser, login, updateUsername, deleteUser, updatePassword } from './crud.js';
import validator from 'validator';
import rateLimit from 'express-rate-limit';
import { createUsersTable } from './database.js';
import jwt from 'jsonwebtoken';
import client from './database.js';

const secret = process.env.JWT_SECRET;

await createUsersTable();

const app = express();
app.use(express.json());

//anti-brute force
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-8',
    legacyHeaders:false
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Preencha corretamente os campos de usuário, e-mail e senha para o cadastro." });
    }
    
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ msg: "O nome de usuário deve ter entre 3 a 20 caracteres." });
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ msg: "Formato de E-mail inválido." });
    }

    if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
        return res.status(400).json({ msg: "A senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula e um número." });
    }

    try {
        //checks if user exists
        const result = await createUser(username, email, password);
        
        if (result?.msg) {
            return res.status(400).json(result);
        }

        return res.status(201).json({ msg: "Usuário criado com sucesso." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
});


app.post('/login', limiter, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json( {msg: "Preencha os campos de usuário e senha!"} );
    }

    try {
        const confirmUser = await login(username, password);

        if (confirmUser === true) {
            //get data
            const query = `
                SELECT * FROM users
                WHERE username = $1
            `;
            //search email
            const queryResult = await client.query(query, [username]);
            const userEmail = queryResult.rows[0].email;
            
            //generate token
            const token = jwt.sign(
                {
                    username: username,
                    email: userEmail
                }, secret, { expiresIn: '1h' }
            );

            return res.status(200).json({ msg: `Logado como ${username}`, token: token });
        } else {
            return res.status(401).json({ msg: "Usuário ou senha inválidos." });
        }
    } catch (err) {
        console.error('Erro ao logar: ', err);
        return res.status(500).json({ "msg":"Erro interno no servidor." });
    }
});


app.post('/update-username', async (req, res) => {
    const { currentUsername, newUsername, password } = req.body;

    if (!currentUsername || !newUsername || !password) {
        res.status(400).json({ msg: "Preencha corretamente os campos!" });
    }

    if (newUsername.length < 3 || newUsername.length > 20) {
        res.status(400).json({ msg: "O novo nome de usuário deve ter entre 3 a 20 caracteres." });
    }

    try {
        const resultUpdate = await updateUsername(currentUsername, newUsername, password);

        if (resultUpdate === true) {
            return res.status(200).json({ msg: "Nome de usuário atualizado com sucesso." });
        } else {
            return res.status(401).json({ msg: "Usuário e/ou senha inválidos." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
});


app.delete('/delete-user', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ msg: "Preencha os campos de usuário e senha!"} );
        }

        const confirmData = await login(username, password);

        if (confirmData === false) {
            return res.status(401).json({ msg: "Usuário e/ou senha inválidos." });
        }

        if (confirmData === true) {
            await deleteUser(username, password);
            return res.status(200).json({ msg: "Conta deletada com sucesso." });
        }
    } catch {
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
});


app.post('/update-password', async (req, res) => {
    const { newPassword, currentPassword, email } = req.body;

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
        return res.status(400).json({ msg: "A senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula e um número." });
    }

    const result = await updatePassword(newPassword, currentPassword, email);

    if (result === false) {
        return res.status(401).json({ msg: "Usuário e/ou senha inválidos." });
    } else {
        return res.status(201).json({ msg: "Senha atualizada com sucesso." })
    }


});


app.listen(3000)