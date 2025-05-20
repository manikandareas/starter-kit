import { buttonVariants } from "@/components/ui/button";
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
	//   const isBillingPath = matchRoute({ to: BillingSettingsRoute.fullPath });
	return (
		<div className="flex h-full w-full px-6 py-8">
			<div className="mx-auto flex h-full w-full max-w-screen-xl gap-12">
				<div className="hidden w-full max-w-64 flex-col gap-0.5 lg:flex">
					<Link
						to={"/dashboard/settings"}
						className={cn(
							`${buttonVariants({ variant: "ghost" })} ${isSettingsPath && "bg-primary/5"}`,
							"justify-start rounded-md",
						)}
					>
						<span
							className={cn(
								`text-sm text-primary/80 ${isSettingsPath && "font-medium text-primary"}`,
							)}
						>
							General
						</span>
					</Link>
					{/* <Link
            to={BillingSettingsRoute.fullPath}
            className={cn(
              `${buttonVariants({ variant: "ghost" })} ${isBillingPath && "bg-primary/5"} justify-start rounded-md`,
            )}
          >
            <span
              className={cn(
                `text-sm text-primary/80 ${isBillingPath && "font-medium text-primary"}`,
              )}
            >
              Billing
            </span>
          </Link> */}
				</div>

				<Outlet />
			</div>
		</div>
	);
}
