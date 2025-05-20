import { ConvexQueryClient } from "@convex-dev/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { env } from "./env.ts";
import reportWebVitals from "./reportWebVitals.ts";

// Create a new router instance
const router = createRouter({
	context: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		queryClient: undefined!,
		auth: {
			isAuthenticated: false,
			isLoading: true,
		},
	},
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Convex client
const convex = new ConvexReactClient(env.VITE_CONVEX_URL);

const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});

convexQueryClient.connect(queryClient);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const InnerApp = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<RouterProvider
			router={router}
			context={{
				queryClient,
				auth: {
					isAuthenticated,
					isLoading,
				},
			}}
		/>
	);
};

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider>
				<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
					<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
						<QueryClientProvider client={queryClient}>
							<InnerApp />
						</QueryClientProvider>
					</ConvexProviderWithClerk>
				</ClerkProvider>
			</ThemeProvider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
