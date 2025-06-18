import { Button } from "@/components/retroui/button";
import { cn } from "@/lib/utils";
import {
	Link,
	Outlet,
	createFileRoute,
	useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/_authenticated/dashboard/_layout/settings",
)({
	component: DashboardSettingsLayout,
});

export default function DashboardSettingsLayout() {
	const matchRoute = useMatchRoute();
	const isSettingsPath = matchRoute({ to: "/dashboard/settings" });

	return (
		<div className="flex h-full w-full px-6 py-8">
			<div className="mx-auto flex h-full w-full max-w-screen-xl gap-12">
				<div className="hidden w-full max-w-64 flex-col gap-0.5 lg:flex">
					<Link
						to={"/dashboard/settings"}
						// className={cn(
						//    `${buttonVariants({ variant: "ghost" })} ${isSettingsPath && "bg-background"}`,
						//    "justify-start rounded-md",
						// )}
					>
						<Button
							variant={"outline"}
							className={cn(
								`text-sm w-full text-foreground ${isSettingsPath && "font-medium"}`,
							)}
						>
							Umum
						</Button>
					</Link>
				</div>

				<Outlet />
			</div>
		</div>
	);
}
