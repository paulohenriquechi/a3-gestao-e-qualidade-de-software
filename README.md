# Projeto A3 Gestão e Qualidade de Software

![Capa do Projeto](https://hdrup.com/wp-content/uploads/2019/11/software-para-gestao-da-qualidade.jpg)


# Índice/Sumário

* [Sobre](#sobre-o-projeto)
* [Como rodar o projeto](#como-rodar-o-projeto)
* [Requisitos](#requisitos)
* [Tecnologias usadas](#tecnologias-usadas)
* [Links](#links)
* [Contribuição](#contribuição)
* [Autores](#autores)
* [Licença](#licença)

# Sobre o projeto


Nosso projeto da matéria de Gestão e Qualidade de Software possui o objetivo de demonstrar nossa capacidade de aplicar e compreender os princípios do Clean Code, utilizando a refatoração em um código-fonte legado. Visando aprimorar a legibilidade, manutenibilidade e eficiência do código-fonte sem alterar suas funcionalidades.

# Como rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/paulohenriquechi/a3-gestao-e-qualidade-de-software.git
   cd a3-gestao-e-qualidade-de-software
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variaveis de ambiente**
   Copie os arquivos `.env.example`, `.env.test.example` para `.env`, `.env.test` e ajuste se necessário.

4. **Configure o banco de dados:**
   Rode as migrations do Prisma:
     ```sh
     npx prisma migrate dev --name init
     ```

5. **Inicie o servidor:**
   ```sh
   npm start
   ```

6. **Para rodar os testes:**
   ```sh
   npm test
   ```

O servidor estará disponível em `http://localhost:3000`.

# Requisitos
- [x] **Melhora na Legibilidade**
- [x] **Estrutura adequada com menor complexidade**
- [x] **SOLID, DRY, KISS e YAGNI**
- [x] **Testes Unitários**
- [x] **Versionamento**

# Tecnologias usadas

- [Node.js](https://nodejs.org/en/)	
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Prisma Client](https://www.prisma.io/docs/orm/prisma-client)
- [Express](https://expressjs.com)
- [Jest](https://jestjs.io/docs/getting-started)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Zod](https://www.npmjs.com/package/zod)
- [Dotenv](https://www.npmjs.com/package/dotenv)


# Links

- [Código-fonte legado](https://github.com/diogosouza/simple-express-crud-api)
- [GitHub Paulo](https://github.com/paulohenriquechi/a3-gestao-e-qualidade-de-software)
- [GitHub Gabriel](https://github.com/Daiskz/a3-gestao-e-qualidade-de-software)

# Contribuição

Leia o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para saber detalhes sobre o nosso código de conduta e o processo de envio de solicitações *pull* (*Pull Request*) para nós.

# Autores

- [Gabriel Daisuke Matsubara](https://github.com/Daiskz) - RA: 8222245563
- [Paulo Henrique Chi](https://github.com/paulohenriquechi) - RA: 8222242190

# Licença

Este projeto está licenciado sob a Licença MIT,  consulte o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.
