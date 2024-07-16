import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import responseTime from 'response-time';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js'
import health from './health.js'
import morganMiddleware from './morgan.middleware.js';
import logger from './logger.js';
import  { readFile } from 'node:fs/promises'
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);
app.use(morganMiddleware);

app.post('/login', handleLogin);

app.use("/", health)

app.use(responseTime())

const typeDefs = await readFile('./schema.graphql', 'utf8');

const getContext = ({ req }) => {
  //console.log('[getContext] req.auth', req.auth)
  return{ auth: req.auth}
}

// Serve Apollo UI
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext}));

// serve swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen({ port: PORT }, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`GraphQl endpoint: http://localhost:${PORT}/graphql`);
  logger.info(`Swagger UI endpoint: http://localhost:${PORT}/api-docs`);
});
