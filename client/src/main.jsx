import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.jsx";
import "./index.css";
import GridBackground from "./components/ui/GridBackground.jsx";

const SERVER_BASE_URL = import.meta.VITE_SERVER_BASE_URL;
const GRAPHQL_URI = "/graphql";

// const client = new ApolloClient({
// 	// TODO => Update the uri on production
// 	uri:
// 		import.meta.env.VITE_NODE_ENV === "development"
// 			? `${SERVER_BASE_URL}${GRAPHQL_URI}`
// 			: GRAPHQL_URI, // the URL of our GraphQL server.
// 	cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
// 	credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<GridBackground>
// 				<ApolloProvider client={client}>
// 					<App />
// 				</ApolloProvider>
// 			</GridBackground>
// 		</BrowserRouter>
// 	</React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<App />
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);