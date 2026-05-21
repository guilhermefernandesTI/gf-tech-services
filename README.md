# GF Tech Services

Sistema web para gerenciamento de servicos tecnicos de informatica. A aplicacao permite cadastrar, listar, atualizar e excluir atendimentos, mantendo os dados persistidos em um arquivo JSON local.

## Ambiente de desenvolvimento

O projeto foi desenvolvido em ambiente local com:

- Windows 11
- Node.js 24
- NPM 11
- Navegador Google Chrome para testes da interface
- Visual Studio Code como editor de codigo

## Tecnologias utilizadas

- Linguagem: JavaScript
- Back-end: Node.js e Express.js
- Front-end: HTML5, CSS3 e JavaScript
- Banco de dados/persistencia: arquivo JSON local em `data/services.json`
- Testes automatizados: Node.js Test Runner, modulo nativo `node:test`

## Funcionalidades

- Cadastro de servicos tecnicos
- Listagem dos atendimentos cadastrados
- Busca por cliente, equipamento ou status
- Atualizacao de registros existentes
- Exclusao de registros
- Validacao de campos obrigatorios
- Persistencia dos dados em arquivo local

## Requisitos de sistema

- Node.js 18 ou superior
- NPM 9 ou superior
- Navegador moderno, como Chrome, Edge ou Firefox
- Permissao de escrita na pasta do projeto para salvar o arquivo `data/services.json`

## Como instalar e executar

1. Clone ou baixe este repositorio.
2. Acesse a pasta do projeto.
3. Instale as dependencias:

```bash
npm install
```

4. Inicie a aplicacao:

```bash
npm start
```

5. Abra o navegador em:

```text
http://localhost:3000
```

## Como executar os testes

Use o comando:

```bash
npm test
```

Os testes verificam a criacao, listagem, atualizacao, remocao e validacao dos dados de servicos.

## Como contribuir

1. Crie uma copia do repositorio.
2. Crie uma nova branch para a sua alteracao.
3. Implemente a melhoria ou correcao.
4. Execute os testes automatizados.
5. Abra um pull request descrevendo o que foi alterado.

## Praticas de codigo limpo aplicadas

- Nomes significativos para variaveis, funcoes e arquivos.
- Separacao de responsabilidades entre servidor, persistencia, repositorio e validacao.
- Funcoes pequenas e focadas em uma unica tarefa.
- Validacao centralizada dos dados antes de criar ou atualizar registros.
- Comentarios evitados quando o proprio codigo ja comunica a intencao.

## Testes automatizados

O projeto possui testes automatizados na pasta `tests`. Eles cobrem as principais regras do CRUD e a validacao dos dados enviados pelo usuario.

## Padrao de projeto utilizado

Foi aplicado o padrao **Repository** no arquivo `src/serviceRepository.js`. Ele concentra as operacoes de acesso aos dados e deixa o servidor Express responsavel apenas por receber requisicoes e retornar respostas HTTP.
