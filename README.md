# 🌎 User API

A user management API built with Express and PostgreSQL, fully package with Docker. The goal with this project is put into practice what I've learned.


## 📦 Features

    - 📝 Register user

    - 🔐 User login

    - ✏️ Update username

    - 🔄 Change password

    - 🗑️ Delete user

    - 🔒 Password encryption with bcrypt

    - 🚫 Rate limiting to prevent brute-force

    - 🧪 Format validation of username, password and email fields


## ⚙️ Technologies used

   - Node.js

   - Express.js

   - PostgreSQL

   - Docker

   - JWT - jsonwebtoken

   - bcrypt

   - express-rate-limit

   - dotenv

   - validator

## 📜 Requirements

   - Docker installed - [Download](https://www.docker.com)
   - Postman or any other API testing tool (optional) - [Download](https://www.postman.com/downloads/)

## 🚀 How to run

1. Clone this repository:

```bash
   git clone https://github.com/smthy1/user-api.git
   cd user-api
```

2. Build and start the containers:

```bash
    docker-compose up --build -d
```
Wait a few seconds for Docker build and start the containers, then you're ready to test the app.
    - Base URL: http://localhost:3000/

3. Available endpoints:

- POST /register – Create user
- POST /login – Login
- POST /new-username – Change username
- POST /new-password – Change password
- DELETE /delete-user – Delete user

## ⚠️ Additional notes

  - You can explore the database visually, if you want. Access pgAdmin at http://localhost:5050 | Login: admin@gmail.com | Password: admin.
   
   - When accessing the database via PgAdmin4, you'll need to manually register to view its interface. Follow these steps:
      - 1. After loggin into pgAdmin4, right click on "Servers" → Register → Server.

      - 2. A window will open for entering the connection datails to the PostgreSQL database. In the "General" tab, you can enter any name you want in the Name field.

      - 3. Now in the "Connection" tab, fill in the following: Host: db | Port: 5432 | Maintenance DB: users | Username: postgres | Password: postgres.

      - 4. Click save and now you'll be able to explore the database visually: click on the server icon with the name you chose → users → schemas → public → tables → right click on "users" → "view/edit data" → all rows.

      - 5. You're now viewing the database structure and its data.

  - To test correctly, API routes require body params:

      - POST /register – { "username": "...", "email":"...", "password": "..." }
                     
      - POST /login – { "username":"...", "password":"..."}

      - POST /new-username – { "currentUsername":"...", "newUsername":"...", "password":"..." }

      - POST /new-password – { "newPassword":"...", "currentPassword":"...", "email":"..." }

      - DELETE /delete-user – { "username":"...", "password":"..." }


## 🧠 What I learned

   - ✅ API creation with Express.js

   - 🔐 Encrypting passwords with bcrypt

   - 🔐 Authentication with JWT (JSON Web Token)

   - 🛡️ Rate limiting with express-rate-limit

   - 🤖 Implement format validation of username, password and email fields

   - 📦 Dockerizing Node.js + PostgreSQL apps

   - ⚙️ Managing environment variables (.env)

   - 🔗 Container communication
   

## 🤝 Contributing

Feel free to open issues or submit pull requests with suggestions or improvements!

# ✉️ Contact:

Developed by [smthy1](https://github.com/smthy1). Contacte me via [email](mailto:luiz.smith.br@gmail.com)


# 🇧🇷 API de Usuários

API de gerenciamento de cadastro de usuários feito com Express, PostreSQL e empacotada com Docker. O objetivo deste projeto é botar em prática o que aprendi.

## 📦 Funcionalidades

   - 📝 Registrar usuário

   - 🔐 Login de usuário

   - ✏️ Mudar nome de usuário

   - 🔄 Alterar senha

   - 🗑️ Excluir conta

   - 🔒 Encriptação de senha com bcrypt

   - 🚫 Prevenção de brute force com Express rate limit

   - 🧪 Validação dos formatos dos campos de usuário, senha e e-mail


## ⚙️ Tecnologias utilizadas

   - Node.js

   - Express.js

   - PostgreSQL

   - Docker

   - JWT - jsonwebtoken

   - bcrypt

   - express-rate-limit

   - dotenv

   - validator


## 📜 Requisitos

   - Ter Docker instalado - [Download](https://www.docker.com)
   - Postman ou qualquer outra ferramenta pra testar as rotas da API (opcional) - [Download](https://www.postman.com/downloads/)


## 🚀 Como executar

1. Clone este repositório:

```bash
   git clone https://github.com/smthy1/user-api.git
   cd user-api
```

2. Gere os containers:

```bash
   docker-compose up --build -d
```
Aguarde alguns segundos até o Docker gerar e iniciar os containers, depois disso você já pode testar a API
   - URL Base: http://localhost:3000/

3. Endpoints disponíveis:

- POST /register – Registrar usuário
- POST /login – Login
- POST /new-username – Mudar o nome de usuário
- POST /new-password – Alterar a senha
- DELETE /delete-user – Excluir conta

## ⚠️ Observações

  - Você pode explorar a interface do banco, caso for do seu interesse. Access pgAdmin at http://localhost:5050 | Login: admin@gmail.com | Senha: admin.

   - Caso queira acessar o banco visualmente, você vai precisará adicionar manualmente a conexão com o banco. Siga esses passos:
      - 1. Depois de logar na plataforma do pgAdmin4, clique com o botão direito em "Servers" → Register → Server.

      - 2. Vai abrir uma janela para colocar os detalhes da conexão com o banco de dados PostgreSQL. Na aba "General", você pode nomear como quiser sem problemas.

      - 3. Agora na aba "Connection", preencha os campos da seguinte forma: Host: db | Port: 5432 | Maintenance DB: users | Username: postgres | Password: postgres.

      - 4. Clique em save e agora já você pode explorar visualmente o banco de dados. Clique no ícone com o nome que você escolheu anteriormente → users → schemas → public → tables → right click on "users" → "view/edit data" → all rows.

      - 5. Agora você já está visualizando a estrutura do banco e os dados. 
   
   - Pra testar corretamente, as rotas da API precisam body params:

      - POST /register – { "username": "...", "email":"...", "password": "..." }
                     
      - POST /login – { "username":"...", "password":"..."}

      - POST /new-username – { "currentUsername":"...", "newUsername":"...", "password":"..." }

      - POST /new-password – { "newPassword":"...", "currentPassword":"...", "email":"..." }

      - DELETE /delete-user – { "username":"...", "password":"..." }


## 🧠 O que aprendi

   - ✅ Criação de API com Express.js

   - 🔐 Encriptar senhas com bcrypt

   - 🔐 Autenticação com JWT (JSON Web Token)

   - 🛡️ Prevenção de brute force com express-rate-limit

   - 🤖 Validação dos formatos dos campos de usuário, senha e e-mail com validator

   - 📦 Empacotar aplicações com Docker

   - ⚙️ Gerenciamento de variáveis de ambiente (.env)

   - 🔗 Comunição entre os containers
   
## 🤝 Contribuições
Sinta-se à vontade para abrir issues ou enviar pull requests com sugestões e melhorias!

# ✉️ Contato
Desenvolvido por [smthy1](https://github.com/smthy1). Me contate via [email](mailto:luiz.smith.br@gmail.com)