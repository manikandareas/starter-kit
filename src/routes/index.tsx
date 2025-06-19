import { Button } from "@/components/retroui/button";
import { Logo } from "@/components/ui/logo";
import { SignInButton } from "@clerk/clerk-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
	ssr: true,
});

function Index() {
	const { isLoading, isAuthenticated } = useConvexAuth();
	// const theme = "dark";
	return (
		<div className="relative flex h-full w-full flex-col bg-card">
			{/* Navigation */}
			<div className="sticky top-0 z-50 mx-auto flex w-full max-w-screen-lg items-center justify-between p-6 py-3">
				<Link to="/" className="flex size-8 items-center text-foreground gap-1">
					<Logo />
				</Link>
				<div className="flex items-center gap-4">
					<a
						href="https://twitter.com/convex_dev"
						target="_blank"
						rel="noreferrer"
						className="flex h-9 w-9 items-center justify-center"
					>
						<svg
							className="h-[18px] w-[18px] text-primary"
							strokeLinejoin="round"
							viewBox="0 0 16 16"
						>
							<title>Twitter</title>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
								fill="currentColor"
							/>
						</svg>
					</a>

					<Unauthenticated>
						<SignInButton
							mode="modal"
							fallbackRedirectUrl={"/dashboard"}
							signUpFallbackRedirectUrl={"/onboarding/username"}
						>
							<Button size={"sm"} disabled={isLoading}>
								{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
								{!isLoading && !isAuthenticated && "Get Started"}
							</Button>
						</SignInButton>
					</Unauthenticated>

					<Authenticated>
						<Button size={"sm"}>
							<Link to={"/dashboard"} disabled={isLoading}>
								{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
								{!isLoading && isAuthenticated && "Dashboard"}
							</Link>
						</Button>
					</Authenticated>
				</div>
			</div>
		</div>
	);
}
