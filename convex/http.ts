import {} from "@clerk/clerk-react";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

/**
 * Handles all OPTIONS requests with a wildcard route.
 * This is commonly used for CORS preflight requests.
 *
 * @param _ - The context object (unused).
 * @param request - The incoming HTTP request.
 * @returns A Response object with appropriate CORS headers.
 */
http.route({
	pathPrefix: "/", // Match any path
	method: "OPTIONS",
	handler: httpAction(async (_, request) => {
		// Get the origin from the request
		const origin = request.headers.get("Origin") || "*";

		return new Response(null, {
			status: 204, // No content
			headers: {
				"Access-Control-Allow-Origin": origin,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow all common methods
				"Access-Control-Allow-Headers":
					"Content-Type, Authorization, X-Requested-With", // Allow common headers
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Max-Age": "86400", // 24 hours
			},
		});
	}),
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
