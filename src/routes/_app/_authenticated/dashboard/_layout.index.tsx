import { HeaderConfiguration } from "@/components/header-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import siteConfig from "@/site.config";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/_authenticated/dashboard/_layout/")(
	{
		component: RouteComponent,
		beforeLoad: () => ({
			title: `${siteConfig.siteTitle} - Dashboard`,
		}),
		ssr: true,
	},
);

function RouteComponent() {
	return (
		<>
			<HeaderConfiguration
				headerDescription="Manage your Apps and view your usage."
				headerTitle="Dashboard"
			/>
			<div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
				<div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
					<div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
						<div className="flex w-full flex-col rounded-lg p-6">
							<div className="flex flex-col gap-2">
								<h2 className="text-xl font-medium text-primary">
									Get Started
								</h2>
								<p className="text-sm font-normal text-primary/60">
									Explore the Dashboard and get started with your first app.
								</p>
							</div>
						</div>
						<div className="flex w-full px-6">
							<div className="w-full border-b border-border" />
						</div>
						<div className="relative mx-auto flex w-full  flex-col items-center p-6">
							<div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border border-border bg-secondary px-6 py-24 dark:bg-card">
								<div className="z-10 flex max-w-[460px] flex-col items-center gap-4">
									<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-card hover:border-primary/40">
										<Plus className="h-8 w-8 stroke-[1.5px] text-primary/60" />
									</div>
									<div className="flex flex-col items-center gap-2">
										<p className="text-base font-medium text-primary">
											Create your first app
										</p>
										<p className="text-center text-base font-normal text-primary/60">
											Create your first app and start building with Convex.
										</p>
										<span className="hidden select-none items-center rounded-full bg-green-500/5 px-3 py-1 text-xs font-medium tracking-tight text-green-700 ring-1 ring-inset ring-green-600/20 backdrop-blur-md dark:bg-green-900/40 dark:text-green-100 md:flex">
											TIP: Try changing the language!
										</span>
									</div>
								</div>
								<div className="z-10 flex items-center justify-center">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://github.com/get-convex/convex-saas/tree/main/docs"
										className={cn(
											`${buttonVariants({ variant: "ghost", size: "sm" })} gap-2`,
										)}
									>
										<span className="text-sm font-medium text-primary/60 group-hover:text-primary">
											Explore Documentation
										</span>
										<ExternalLink className="h-4 w-4 stroke-[1.5px] text-primary/60 group-hover:text-primary" />
									</a>
								</div>
								<div className="base-grid absolute h-full w-full opacity-40" />
								<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
