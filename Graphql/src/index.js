const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('../models');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

// Start Apollo Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, async () => {
    console.log('Server running at http://localhost:4000' + server.graphqlPath);
    try {
      await sequelize.authenticate();
      console.log('Database connected!');
    } catch (err) {
      console.error('Database connection failed:', err);
    }
  });
}

startServer();
