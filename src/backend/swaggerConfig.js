// swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Estrela',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['index.js'], // Caminho para o arquivo que contém as rotas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
