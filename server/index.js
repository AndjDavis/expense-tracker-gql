import "dotenv/config";
import express from "express";
import session from "express-session";
import http from "http";
import path from "path";
import passport from "passport";
import { buildContext } from "graphql-passport";
import connectMongo from "connect-mongodb-session";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { connectDB } from "./config/db.config.js";
import { configurePassport } from "./config/passport.config.js";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

configurePassport();

const app = express();
const httpServer = http.createServer(app);

const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "sessions",
});

store.on("error", (err) => console.error("MongoDBStore error", err));

const sevenDays = 1000 * 60 * 60 * 24 * 7;
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false, // specifies whether to save the session to the store on every request
		saveUninitialized: false, // specifies whether to save uninitialized sessions
		cookie: {
			maxAge: sevenDays,
			httpOnly: true, // prevents the Cross-Site Scripting (XSS) attacks
		},
		store: store,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	})
);

const PORT = 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
await connectDB();

console.log(`🚀 Server ready on port ${PORT}`);
