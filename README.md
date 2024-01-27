# Facilita Limpezas

Teste de código para a empresa Facilita Direito. O guia do projeto está no https://docs.google.com/document/d/1D9UFnRlWfUUlizmGV-8EIKT8YXpjO2Fxzw7ch1muz9U/edit#heading=h.mrn2lppv65m0.

## Iniciar a aplicação

A aplicação consiste de 3 partes:
- Postgres
- Backend Node
- Frontend react

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

Os arquivos de variáveis de ambiente estão no repositório. Essa não é uma boa prática num geral porque pode expor informações sensíveis, porém para fins de setup rápido e como as informações nos arquivos de ambiente não são sensíveis, elas estão presentes.