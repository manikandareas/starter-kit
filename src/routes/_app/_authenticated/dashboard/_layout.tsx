import { HeaderProvider } from "@/components/header-provider";
import { Header } from "@/components/ui/header";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navigation } from "./-ui.navigation";

export const Route = createFileRoute("/_app/_authenticated/dashboard/_layout")({
	component: DashboardLayout,
});

function DashboardLayout() {
	const { data: user } = useQuery(convexQuery(api.users.getCurrentUser, {}));
	if (!user) {
		return null;
	}
	return (
		<HeaderProvider>
			<div className="flex min-h-[100vh] w-full flex-col bg-secondary dark:bg-black">
				<Navigation user={user} />
				<Header />
				<Outlet />
			</div>
		</HeaderProvider>
	);
}
