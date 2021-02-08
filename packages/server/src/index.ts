import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

import { AuthResolver } from './resolvers/AuthResolver';
import * as constants from './constants';
import { getConnectionConfig } from './ormconfig';

(async () => {
	const connectionConfig = getConnectionConfig();
	await createConnection({ ...connectionConfig, name: 'default' });

	console.log('connected to database successfully');

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AuthResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	const app = express();
	const corsOptions = {
		origin: constants.CLIENT_URI,
	};

	app.use(cors(corsOptions));
	server.applyMiddleware({ app, cors: false });

	app.listen({ port: constants.PORT }, () => {
		console.log(
			`🚀 Server ready at http://localhost:${constants.PORT}${server.graphqlPath}`
		);
	});
})();
