import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/_authenticated")({
	component: AuthenticatedLayout,
});

export default function AuthenticatedLayout() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate({ to: "/" });
		}
	}, [isAuthenticated, isLoading]);
	return <Outlet />;
}
