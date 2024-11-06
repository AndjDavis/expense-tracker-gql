import { ApolloClient, InMemoryCache } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (import.meta.env.DEV) {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const BACKEND_URI = SERVER_BASE_URL + "/graphql";

const client = new ApolloClient({
	uri: BACKEND_URI, // the URL of our GraphQL server.
	cache: new InMemoryCache({}), // Apollo Client uses to cache query results after fetching them.
	credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});

export { client };
