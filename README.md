# ✔️ Requisitos

- ``Docker``
- ``Node``
- ``Yarn``
- ``Npm``

## 📰 Como executar 

- `Docker`: Execute o comando `docker run --name db_cash -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres` para criar o container do banco de dados Postgres da aplicação.

- Entre na pasta do servidor `cd server` e instala as dependências com o comando `yarn`.

- Crie o banco de dados no container já criado e inicializado, usando prisma com o comando `yarn prisma db push`, isso executará o schema.prisma.

- Com o bando de dados criado, execute o comando `yarn dev` para iniciar o servidor de forma local na porta ``3030``.

- Com o servidor rodando volte para a raiz do projeto `cd ..` e entre na pasta da aplicação web `cd web`.

- Na pasta web execute `npm install` para instalar todas as dependências da aplicação.

- Com todas as dependências instaladas execute o comando `npm start`, a aplicação web irá executar de forma local na porta ``3000``


