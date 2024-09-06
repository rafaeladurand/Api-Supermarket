<p align="center">
  <img src="https://github.com/user-attachments/assets/4e9e43a4-df0b-43fa-8a08-89a64c6b404a" alt="logo">
</p>



<h1 align="center"> Mix </h1>

<a id="Sumário"></a>


<p align="center">
  <b> Back-end  </b></br>
  <sub> Api desenvolvida para atender as demandas de um sistema administrativo de supermercado
  <sub>
</p>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<p align="center">
  <a href="#Introdução"> 🧩 Introdução </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Resultados"> 🚀 Resultados</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Dependências"> 🧪 Dependências</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Ideias">💡 Possíveis Melhorias </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


<br /> 

<a id="Introdução"></a>
## 🧩 Introdução 

  ***⠀⠀⠀⠀Essa API foi desenvolvida para representar a dinâmica básica de um sistema administrativo de um supermercado. Aqui será encontrado três entidades fundamentais para o bom funcionamento de um sistema: produtos, usuário(funcionários) e clientes. As funcionalidades básicas encontradas nessa API são: cadastrar, ler, atualizar e deletar produtos, usuários e clientes.***

<br/>

## `Projeto Front-end` ➥ [Link GitHub](https://github.com/rafaeladurand/Supermarket)

<br/>

  https://github.com/user-attachments/assets/c156ebcf-635a-4596-838a-11bd3adaab35

  Vídeo apresentando a organização do código.
  
  <br/>
<a id="Resultados"></a>
## 🚀 Resultados 
  > Todos os resultados foram alcançados com sucesso. De modo geral são esses os resultados de cada requisição. 

<br/>

## 🚩 As funcionalidades básicas da API são:

1. Gerenciamento de Produtos:
- Cadastrar, atualizar, recuperar e remover produtos.
2. Gerenciamento de Funcionários:
- Cadastrar, atualizar, recuperar e remover usuários (funcionários) do supermercado.
- Permitir que os funcionários façam login no sistema.
3. Gerenciamento de Clientes:
- Cadastrar, atualizar, recuperar e remover clientes do supermercado.
- Ver todos os clientes cadastrados no sistema.
4. Gerenciamento de Promoções:
- Cadastrar, atualizar, recuperar e remover promoções.
- Aplicar desconto a produtos específicos (como um chocolate), visível para todos os clientes.
5. Descontos para Clientes:
- Permitir que um usuário do sistema aplique descontos personalizados a um cliente específico.

<br/>

# 🍉🍊🥝 Produtos
## Aqui possui todos os atributos dos produtos cadastrados.
- id: Identificador único que diferencia cada produto.
- nome: O nome do produto.
- precoAtual: O preço atual do produto.
- precoPromocao: O preço promocional do produto (se houver promoção).
- tipo: Categoria ou tipo do produto.
- descricao: Uma descrição detalhada do produto, explicando suas características.
- dataValidade: A data de validade do produto, útil principalmente para produtos perecíveis.

# 🛒 Compra
## Aqui possui todos os atributos das compras.
- nome do produto: Produto associado à compra.
- preco: Preço do produto no momento da compra.
- data da compra: Data em que a compra foi realizada.

# 👥 Cliente
## Aqui possui todos os atributos dos clientes cadastrados.
- nome: Nome do cliente.
- identidade ou CPF: Documento de identificação do cliente (RG ou CPF).
- idade: Idade do cliente.
- tempo de cliente: Tempo que o cliente faz compras no supermercado (um atributo para armazenar há quanto tempo ele é cliente).

# 👥 Usuários
## Aqui possui todos os atributos dos usuários cadastrados.
- id: Identificador único do usuário (obrigatório).
- nome: Nome do usuário (obrigatório).
- CPF: CPF do usuário (obrigatório).

  
<a id="Dependências"></a>
## 🧪 Dependências
> Requisitos para rotar o codigo...

<br/>

## 🚀 Tecnologias/Tools
- Nodejs
- Express
- Mongo
- Mongoose

<br/>

## `📖 Instalação` 

1. Instale o MongoDB:
- Baixe e instale o MongoDB em sua máquina a partir do site oficial (mongodb.com).
 <br />

2. Inicie o MongoDB:
- Abra o terminal e execute o comando: mongod. Isso iniciará o servidor MongoDB na porta padrão (27017).

```BASH
mongod
```
<br /> 

3. Verifique a Conexão:
- Certifique-se de que o MongoDB está rodando e que a URL mongodb://localhost:27017/supermercado está correta.

```BASH
mongodb://localhost:27017/supermercado
```
<br /> 
4. Execute a API:
- No diretório da sua API, abra o terminal e execute o comando: npm start (ou node api_mercado.js).

```BASH
node api_mercado.js
```
<br /> 


<a id="Ideias"></a>
## 💡 Possíveis Melhoras
> Possíveis melhorias no código e no projeto, caso queira voltar e melhorá lo.
> 
<br/>

<a href="#Sumário"> 📖 Volta ao Sumário </a>
