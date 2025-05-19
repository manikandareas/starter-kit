import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_authenticated")({
	component: Outlet,
	beforeLoad: ({ context }) => {
		// Check if the user is authenticated
		if (!context.auth.isAuthenticated && !context.auth.isLoading) {
			throw redirect({ to: "/" });
		}
		return {};
	},
});
