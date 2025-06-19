import { Button } from "@/components/retroui/button";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@clerk/clerk-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import {
	Copy,
	Download,
	ExternalLink,
	FileText,
	Github,
	Loader2,
	Star,
} from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: LandingPage,
	ssr: true,
});

export default function LandingPage() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const previousTheme = theme;
		setTheme("light");

		return () => {
			setTheme(previousTheme);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="min-h-screen bg-yellow-300 scroll-smooth">
			{/* Header */}
			<header className="border-b-4 border-black bg-white">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-red-500 border-2 border-black" />
							<span className="text-2xl font-black">SaaS Ignition</span>
						</div>
						<nav className="hidden md:flex items-center space-x-6">
							<a
								href="#features"
								className="font-bold hover:underline decoration-4"
							>
								Features
							</a>
							<a
								href="#tech-stack"
								className="font-bold hover:underline decoration-4"
							>
								Tech Stack
							</a>
							<a
								href="#docs"
								className="font-bold hover:underline decoration-4"
							>
								Docs
							</a>
						</nav>
						<div className="flex items-center space-x-3">
							<Button variant="outline" size={"sm"}>
								<Github className="w-4 h-4 mr-2" />
								GitHub
							</Button>

							<Unauthenticated>
								<SignInButton
									mode="modal"
									fallbackRedirectUrl={"/sites"}
									signUpFallbackRedirectUrl={"/onboarding/username"}
								>
									<Button size={"sm"} disabled={isLoading}>
										{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
										{!isLoading && !isAuthenticated && "Get Started"}
									</Button>
								</SignInButton>
							</Unauthenticated>

							<Authenticated>
								<Button size={"sm"} disabled={isLoading}>
									<Link
										to={"/dashboard"}
										// className={buttonVariants({ size: "sm" })}
										disabled={isLoading}
									>
										{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
										{!isLoading && isAuthenticated && "Dashboard"}
									</Link>
								</Button>
							</Authenticated>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-20 bg-gradient-to-br from-yellow-300 to-orange-300">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-4xl mx-auto">
						<Badge className="mb-6 bg-red-500 text-white border-2 border-black text-lg px-4 py-2 font-black">
							🚀 PRODUCTION READY
						</Badge>
						<h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
							SaaS Ignition:
							<br />
							<span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1">
								Your Next Big Idea
							</span>
							<br />
							Starts Here 🚀
						</h1>
						<p className="text-xl md:text-2xl font-bold mb-10 max-w-3xl mx-auto">
							Kickstart your SaaS app with a production-ready, modern tech
							stack. Built for developers who hate boilerplate and love shipping
							fast.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-red-500 hover:bg-red-600 text-white border-4 border-black font-black text-xl px-8 py-6 shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all"
							>
								<Download className="w-6 h-6 mr-2" />
								Get the Starter Kit
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-4 border-black font-black text-xl px-8 py-6 bg-white shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all"
							>
								<Github className="w-6 h-6 mr-2" />
								View on GitHub
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Tech Stack Highlights */}
			<section id="tech-stack" className="py-20 bg-blue-400">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							Built with Today's
							<br />
							<span className="bg-white text-black px-4 py-2 inline-block border-4 border-black transform rotate-1">
								Best Developer Tools
							</span>
						</h2>
						<p className="text-xl font-bold max-w-3xl mx-auto">
							We've hand-crafted this starter kit with a powerful, modern stack
							so you can focus on building great products—not wiring
							infrastructure.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								icon: "⚛️",
								name: "React",
								desc: "Component-driven UIs that scale.",
							},
							{
								icon: "⚡",
								name: "Vite",
								desc: "Lightning-fast build & dev server.",
							},
							{
								icon: "🗺️",
								name: "TanStack Router",
								desc: "File-based routing made effortless.",
							},
							{
								icon: "🔄",
								name: "TanStack Query",
								desc: "Smart data fetching and caching.",
							},
							{
								icon: "🌬️",
								name: "Tailwind CSS",
								desc: "Rapid UI development with utility-first classes.",
							},
							{
								icon: "🎨",
								name: "Shadcn/ui",
								desc: "Prebuilt, accessible components with clean design.",
							},
							{
								icon: "☁️",
								name: "Convex",
								desc: "Realtime backend, serverless functions & storage.",
							},
							{
								icon: "🔑",
								name: "Clerk",
								desc: "Plug-and-play authentication & user management.",
							},
							{
								icon: "🧹",
								name: "Biome",
								desc: "Next-gen linting, formatting, and code health.",
							},
							{
								icon: "🧪",
								name: "Vitest",
								desc: "Lightning-fast unit testing.",
							},
							{
								icon: "🔒",
								name: "T3Env",
								desc: "Type-safe environment management.",
							},
						].map((tech) => (
							<Card
								key={tech.name}
								className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000] transition-all hover:transform hover:-translate-y-1"
							>
								<CardHeader>
									<div className="text-4xl mb-2">{tech.icon}</div>
									<CardTitle className="text-2xl font-black">
										{tech.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-bold">{tech.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Key Features */}
			<section id="features" className="py-20 bg-green-400">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							More Than Just a
							<br />
							<span className="bg-black text-white px-4 py-2 inline-block border-4 border-white transform -rotate-1">
								Boilerplate
							</span>
						</h2>
						<p className="text-xl font-bold max-w-3xl mx-auto">
							This isn't just a collection of tools — it's an entire
							productivity workflow.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								icon: "🚀",
								title: "File-based Routing",
								desc: "Add pages with simple file drops.",
							},
							{
								icon: "💅",
								title: "Out-of-the-box Design",
								desc: "Stunning UI with Tailwind & Shadcn.",
							},
							{
								icon: "🔐",
								title: "Secure Auth",
								desc: "Clerk takes care of user management.",
							},
							{
								icon: "🧼",
								title: "Code Quality",
								desc: "Biome keeps your code clean.",
							},
							{
								icon: "⚙️",
								title: "Full-Stack Ready",
								desc: "Convex powers your backend with real-time features.",
							},
							{
								icon: "✅",
								title: "Reliable Testing",
								desc: "Catch bugs early with Vitest.",
							},
							{
								icon: "🌍",
								title: "Environment Safety",
								desc: "Manage secrets safely with T3Env.",
							},
						].map((feature) => (
							<Card
								key={feature.title}
								className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000] transition-all"
							>
								<CardHeader>
									<div className="text-4xl mb-2">{feature.icon}</div>
									<CardTitle className="text-xl font-black">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-bold">{feature.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 bg-purple-400">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							Zero to Launch
							<br />
							<span className="bg-yellow-300 text-black px-4 py-2 inline-block border-4 border-black transform rotate-1">
								in Minutes
							</span>
						</h2>
						<p className="text-xl font-bold">
							Skip the setup headaches. Get straight to building.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ step: "1", title: "Install", desc: "pnpm install", icon: "📦" },
							{
								step: "2",
								title: "Setup Auth",
								desc: "Clerk + Convex integration",
								icon: "🔑",
							},
							{
								step: "3",
								title: "Start Servers",
								desc: "Frontend & backend",
								icon: "🚀",
							},
							{
								step: "4",
								title: "You're Live!",
								desc: "http://localhost:3000",
								icon: "🎉",
							},
						].map((step) => (
							<Card
								key={step.step}
								className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000000] text-center"
							>
								<CardHeader>
									<div className="w-16 h-16 bg-red-500 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl font-black text-white">
											{step.step}
										</span>
									</div>
									<div className="text-4xl mb-2">{step.icon}</div>
									<CardTitle className="text-xl font-black">
										{step.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-bold">{step.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Project Structure */}
			<section className="py-20 bg-pink-400">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-5xl md:text-6xl font-black mb-6">
								Clean &
								<br />
								<span className="bg-white text-black px-4 py-2 inline-block border-4 border-black transform -rotate-1">
									Scalable
								</span>
								<br />
								Architecture
							</h2>
							<p className="text-xl font-bold mb-8">
								Your app is organized for scale from day one. Easily extend,
								maintain, and onboard new team members.
							</p>
						</div>
						<Card className="border-4 border-black bg-black text-green-400 shadow-[8px_8px_0px_0px_#000000] font-mono">
							<CardContent className="p-6">
								<pre className="text-sm">
									{`src/
  ├── components/     # UI building blocks
  ├── routes/         # Pages & layouts
  ├── lib/           # Utilities
  convex/
  ├── schema.ts      # Database schema
  ├── functions/     # Backend logic
  env.mjs            # Type-safe secrets
  main.tsx           # App entry point`}
								</pre>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Developer Experience */}
			<section className="py-20 bg-orange-400">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							Built for Speed,
							<br />
							<span className="bg-black text-white px-4 py-2 inline-block border-4 border-white transform rotate-1">
								Designed for Joy
							</span>
						</h2>
						<p className="text-xl font-bold mb-8">
							Enjoy an exceptional developer experience with:
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
						{[
							{ icon: "🔁", title: "Instant hot reload with Vite" },
							{ icon: "🔬", title: "End-to-end type safety" },
							{ icon: "👁️", title: "Devtools for TanStack Query & Router" },
							{ icon: "🧪", title: "Built-in tests with Vitest" },
							{ icon: "💾", title: "Real-time DB out of the box" },
						].map((item) => (
							<Card
								key={item.title}
								className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] text-center"
							>
								<CardContent className="p-6">
									<div className="text-4xl mb-4">{item.icon}</div>
									<p className="font-black text-lg">{item.title}</p>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center">
						<p className="text-3xl font-black">Code. Test. Ship. Repeat.</p>
					</div>
				</div>
			</section>

			{/* Get Started */}
			<section className="py-20 bg-cyan-400">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-5xl md:text-6xl font-black mb-6">
							Your SaaS Journey
							<br />
							<span className="bg-red-500 text-white px-4 py-2 inline-block border-4 border-black transform -rotate-1">
								Starts Here
							</span>
						</h2>
					</div>

					<Card className="max-w-2xl mx-auto border-4 border-black bg-black text-green-400 shadow-[12px_12px_0px_0px_#000000]">
						<CardContent className="p-8">
							<div className="font-mono text-lg space-y-2 mb-6">
								<div className="flex items-center justify-between">
									<span>$ pnpm install</span>
									<Button
										size="sm"
										variant="outline"
										className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<span>$ npx convex dev</span>
									<Button
										size="sm"
										variant="outline"
										className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<span>$ pnpm dev</span>
									<Button
										size="sm"
										variant="outline"
										className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>
							<p className="text-white font-bold text-center">
								Start building instantly. Full docs available in the repo.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-red-500">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-5xl md:text-7xl font-black text-white mb-6">
						Ready to Launch Your
						<br />
						<span className="bg-yellow-300 text-black px-4 py-2 inline-block border-4 border-black transform rotate-1">
							SaaS Product?
						</span>
					</h2>
					<p className="text-2xl font-bold text-white mb-4">
						Everything you need. Nothing you don't.
					</p>
					<p className="text-xl font-bold text-white mb-12">
						Kick off your next project with SaaS Ignition.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							className="bg-yellow-300 hover:bg-yellow-400 text-black border-4 border-black font-black text-xl px-8 py-6 shadow-[8px_8px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#000000] transition-all"
						>
							<Download className="w-6 h-6 mr-2" />
							Download Now
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-4 border-white text-white font-black text-xl px-8 py-6 bg-transparent hover:bg-white hover:text-red-500 shadow-[8px_8px_0px_0px_#ffffff] hover:shadow-[4px_4px_0px_0px_#ffffff] transition-all"
						>
							<FileText className="w-6 h-6 mr-2" />
							View Docs
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-4 border-white text-white font-black text-xl px-8 py-6 bg-transparent hover:bg-white hover:text-red-500 shadow-[8px_8px_0px_0px_#ffffff] hover:shadow-[4px_4px_0px_0px_#ffffff] transition-all"
						>
							<Star className="w-6 h-6 mr-2" />
							Star on GitHub ⭐
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-12 bg-black text-white border-t-4 border-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-red-500 border-2 border-white" />
								<span className="text-2xl font-black">SaaS Ignition</span>
							</div>
							<p className="font-bold">
								Production-ready SaaS starter kit for modern developers.
							</p>
						</div>

						<div>
							<h3 className="text-xl font-black mb-4">Resources</h3>
							<ul className="space-y-2">
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										GitHub Repo
									</a>
								</li>
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										Documentation
									</a>
								</li>
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										License
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-black mb-4">Tech Stack</h3>
							<ul className="space-y-2">
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										React
									</a>
								</li>
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										Convex
									</a>
								</li>
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										Clerk
									</a>
								</li>
								<li>
									<a href="/" className="font-bold hover:text-yellow-300">
										TanStack
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-xl font-black mb-4">Connect</h3>
							<div className="flex space-x-4">
								<a
									href="/"
									className="w-10 h-10 bg-white text-black border-2 border-white flex items-center justify-center hover:bg-yellow-300 transition-colors"
								>
									<Github className="w-5 h-5" />
								</a>
								<a
									href="/"
									className="w-10 h-10 bg-white text-black border-2 border-white flex items-center justify-center hover:bg-yellow-300 transition-colors"
								>
									<ExternalLink className="w-5 h-5" />
								</a>
							</div>
						</div>
					</div>

					<div className="border-t-2 border-white mt-8 pt-8 text-center">
						<p className="font-bold">
							© {new Date().getFullYear()} SaaS Ignition. Built with ❤️ for
							developers who ship fast.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
