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
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

import { connectDB } from "./config/db.config.js";
import { configurePassport } from "./config/passport.config.js";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

configurePassport();

const app = express();
const httpServer = http.createServer(app);

const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

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

const landingPage =
	process.env.NODE_ENV === "production"
		? ApolloServerPluginLandingPageProductionDefault({
				graphRef: "my-graph-id@my-graph-variant",
				footer: false,
		  })
		: ApolloServerPluginLandingPageLocalDefault({ footer: false });

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), landingPage],
});

await server.start();

app.use(
	"/graphql",
	cors({
		origin: [CLIENT_URL],
		credentials: true,
	}),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	})
);

// npm run build will build your frontend app, and it will the optimized version of your app
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
await connectDB();

console.log(`🚀 Server ready on port ${PORT}`);
