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
			<div className="flex h-full w-full bg-background p-4 sm:p-6 md:p-8">
				<div className="z-10 mx-auto flex h-full w-full max-w-screen-xl">
					<div className="flex w-full flex-col rounded-lg border-2 border-border bg-card shadow-lg">
						<div className="flex w-full flex-col p-6">
							<div className="flex flex-col gap-2">
								<h2 className="font-head text-2xl font-black text-foreground">
									Get Started
								</h2>
								<p className="font-sans text-muted-foreground">
									Explore the Dashboard and get started with your first app.
								</p>
							</div>
						</div>
						<div className="flex w-full px-6">
							<div className="w-full border-b-2 border-border" />
						</div>
						<div className="relative mx-auto flex w-full flex-col items-center p-6">
							<div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-md border-2 border-dashed border-border bg-background p-12 sm:p-16 md:p-24">
								<div className="base-grid absolute h-full w-full opacity-40" />
								<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-card to-transparent" />
								<div className="z-10 flex max-w-[460px] flex-col items-center gap-4">
									<div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-border bg-card shadow-md transition-all hover:shadow-lg">
										<Plus className="h-8 w-8 stroke-2 text-muted-foreground" />
									</div>
									<div className="flex flex-col items-center gap-2">
										<p className="text-lg font-semibold text-foreground">
											Create your first app
										</p>
										<p className="text-center text-base font-normal text-muted-foreground">
											Create your first app and start building with Convex.
										</p>
										<span className="hidden select-none items-center rounded-full bg-green-500/5 px-3 py-1 text-xs font-medium tracking-tight text-green-700 ring-1 ring-inset ring-green-600/20 backdrop-blur-md dark:bg-green-900/40 dark:text-green-100 md:flex">
											TIP: Try changing the language!
										</span>
									</div>
								</div>
								<div className="z-10 mt-2 flex items-center justify-center">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://github.com/get-convex/convex-saas/tree/main/docs"
										className={cn(
											buttonVariants({ variant: "outline", size: "sm" }),
											"group gap-2 border-2 shadow-sm hover:shadow-md",
										)}
									>
										<span className="font-sans text-sm font-medium text-muted-foreground group-hover:text-foreground">
											Explore Documentation
										</span>
										<ExternalLink className="h-4 w-4 stroke-2 text-muted-foreground group-hover:text-foreground" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</> 
	);
}
