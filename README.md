# Facilita Limpezas

Teste de código para a empresa Facilita Direito. O guia do projeto está no https://docs.google.com/document/d/1D9UFnRlWfUUlizmGV-8EIKT8YXpjO2Fxzw7ch1muz9U/edit#heading=h.mrn2lppv65m0.

## Iniciar a aplicação

A aplicação consiste de 3 partes:
- Postgres
- Backend Node
- Frontend react

Os arquivos de variáveis de ambiente estão no repositório. Essa não é uma boa prática num geral porque pode expor informações sensíveis, porém para fins de setup rápido e como as informações nos arquivos de ambiente não são realmente sensíveis, elas estão presentes.

Para iniciar a aplicação você deve ter instalado o Docker e Nodejs.
Para configurar o postgres facilmente, decidi usar uma imagem Docker. Inicie o Docker, abra um terminal na pasta do repositório e execute \
```docker compose up -d```

Isso deve iniciar o seu servidor Postgres e configurar o bando de dados segundo o DDL no arquivo ```./postgres/init-db.sql```

Agora no terminal navegue para a pasta ```./backend``` e execute \
```npm install``` \
```npm start```

O aplicativo backend deverá começar.

Para iniciar o front, navegue para ```./frontend``` e execute \
```npm install``` \
```npm run dev```

Isso deve iniciar o seu frontend e já pode ser navegado. A aplicação é bem intuitiva e aqui segue um explicativo rápido.

Na seção de cadastro de cliente você consegue cadastrar um cliente novo. Emails repetidos não são permitidos, gerando uma mensagem de erro no front. O telefone tem um formato específico a ser enviado com 2 dígitos de ddd, um espaço e 9 dígitos de telefone, como segue no exemplo. O não cumprimento do template gera uma mensagem de erro.

Na seção de cadastro de endereço de cliente você consegue cadastrar valores de coordenadas X e Y que representam os endereços dos clientes. Elas podem ir de -100 a 100. Só podem ser cadastrados endereços para emails que já foram cadastrados na seção anterior. Mais de um endereço pode ser cadastrado para o mesmo cliente inclusive clientes diferentes podem ter o mesmo endereço, o que são cenários possíveis num negócio.

Na seção de listagem de clientes no input você pode colocar qualquer parte do nome ou email do cliente e ela retornará uma lista com todos os clientes que têm o texto digitado contido em seu nome ou email.

No botão Ver Ordem de Visitação é feito uma listagem de todos os cliente cadastrados (até 15 clientes para fins de teste) e eles estarão numa ordem de visitação de forma a formar o menor caminho saindo da sede (0,0) e passando por todos os clientes. Esse problema é conhecido como Travelling Salesman Problem e é um problema NP-Hard. A minha implementação da solução usa Computação Dinâmica e está no arquivo ```./backend/utils/tspSolver.js```

Qualquer dúvida estarei a disposição.


