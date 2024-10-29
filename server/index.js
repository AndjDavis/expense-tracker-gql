import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { connectDB } from "./config/db.conf.js";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/",
	cors(),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req }) => ({ req }),
	})
);

const PORT = 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
await connectDB();

console.log(`🚀 Server ready on port ${PORT}`);
