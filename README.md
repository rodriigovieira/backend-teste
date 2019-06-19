# Backend

Esse é o backend feito conforme solicitado pelo teste. Possui um sistema de autenticação básico, com login e criação de conta, e também possui um gerenciuamento básico de usuários, com todas as operações CRUD.

Esse projeto utiliza as seguintes tecnologias:

- NodeJS com Express
- Apollo-Server para integrar o servidor com GraphQL
- JSONWebToken para verifiações de tokens e BCrypt para criptografar as senhas
- Eslint para manter o padrão do código
- Dotenv para configurar as variáveis de ambiente no ambiente de desenvolvimento

Como o servidor utiliza GraphQL, a documentação pode ser encontrada no próprio GraphQL Playground. Ele se encontra no endpoint /graphql, mas ao acessar o endpoint /, você será redirecionado automaticamente.

O servidor pode ser acessado nesse endereço: https://backend-teste-nodejs.herokuapp.com/graphql

## Instalação

Caso prefira instalá-lo localmente, siga os passos abaixo. OBS: os passos abaixo assumem que você possui o yarn instalado globalmente. Caso não possua, basta apenas executar `npm -g install yarn`.

1. Clone esse repositório executando o seguinte comando:

```
git clone https://github.com/rodriigovieira/backend-teste.git
```

2. Mude para o diretório do projeto:

```
cd backend-teste
```

3. Instale as dependências do projeto:

```
yarn
```

4. Defina as variáveis de ambiente:

Crie um arquivo .env e defina as variáveis JWT_SECRET e MONGO_URI.

JWT_SECRET é utilizada para definir uma chave secreta única para o JSONWebToken. MONGO_URI é a URI de conexão do MongoDB. Você pode utilizar algum serviço gratuito como MongoLab ou instalar o Mongo localmente.

5. Execute o projeto:

A configuração está pronta!

Agora é só executar o projeto, executando o seguinte comando:

```
yarn dev
```

E pronto!

## Documentação

O projeto apresenta 6 operações, sendo 2 queries e 4 mutations. Todas devem ser feitas no endpoint /graphql. Você pode executá-las no próprio GraphQL Playground, ou utilizando uma IDE com suporte ao GraphQL, como o Insomnia.

#### Queries

Todas as queries necessitam de autenticação. Para poder se autenticar, basta criar um usuário com a mutation `createUser`, e utilizar o token que é retornado no momento da criação. Alternativamente, você pode recuperar esse token sempre utilizando a mutation `loginUser`.

Para usar o token, basta defini-lo nos headers da solicitação, dessa maneira:

```
"Authorization": "Bearer SEU_TOKEN_AQUI"
```

**users**: retorna a lista de todos os usuários do banco de dados.

Exemplo:

```
  query {
    users {
      id
      name
      email
    }
  }
```

Essa operação retornará todos os usuários, mostrando o id, nome e e-mail deles.

**me**: retorna o usuário que está autenticado no momento.

Exemplo:

```
  query {
    me {
      id
      name
      email
    }
  }
```

Essa operacão retornará o id, nome e e-mail do usuário que está conectado atualmente.

#### Mutations

**createUser**: cria um usuário, retornando o usuário e o token. É preciso informar o nome, e-mail e senha.

Exemplo:

```
  mutation {
    createUser(data: {
      name: "Rodrigo Vieira",
      email: "rodriigovieira@gmail.com",
      password: "euadorographql"
    }) {
      token
      user {
        id
        name
        email
      }
    }
  }
```

Essa operação criará um usuário com os dados informados, retornando o token e o id, nome e e-mail do usuário criado.

**loginUser**: retorna a token de autenticação e o usuário, se o e-mail e senha estiverem corretos.

Exemplo:

```
  mutation {
    loginUser(data: {
      email: "rodriigovieira@gmail.com",
      password: "euadorographql"
    }) {
      token
      user {
        id
      }
    }
  }
```

Essa operação efetuará o login com o e-mail e senha informados, retornando o token e o id do usuário que os dados de autenticação coincidem, caso estejam corretos.

**updateUser**: atualiza um usuário, re-criptografando a senha caso essa seja fornecida. É preciso estar autenticado. e só é possível mudar você mesmo (você não pode mudar outro usuário). É preciso fornecer o ID do usuário que deseja mudar.

Exemplo:

```
  mutation {
    updateUser(id: "5d0a1cf812be7b7d6a489e8a", data: {
      name: "Novo Nome",
      email: "novoemail@email.com
    }) {
      id
      name
    }
  }
```

Essa operação alterará os dados do usuário com ID `5d0a1cf812be7b7d6a489e8a`, retornando o id e nome do usuário atualizado.

**deleteUser**: deleta um usuário. Seguindo o padrão do `updateUser`, você também só pode deletar a própria conta. É preciso fornecer o ID do usuário que deseja mudar.

Exemplo:

```
  mutation {
    deleteUser(id: "5d0a1c5bfc57527d30d7447f") {
      id
      name
    }
  }
```

Essa operação deletará o usuário com ID `5d0a1c5bfc57527d30d7447f` e retornará o nome e ID dele.
