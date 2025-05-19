import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_authenticated/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useQuery(convexQuery(api.users.getCurrentUser, {}));
	return <div>Hello {user.data?.username}</div>;
}
