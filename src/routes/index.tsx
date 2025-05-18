import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcherHome } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";
import siteConfig from "@/site.config";
import { SignInButton } from "@clerk/clerk-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { Loader2, Star } from "lucide-react";
import ShadowPNG from "/images/shadow.png";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { isLoading, isAuthenticated } = useConvexAuth();
	const theme = "dark";
	return (
		<div className="relative flex h-full w-full flex-col bg-card">
			{/* Navigation */}
			<div className="sticky top-0 z-50 mx-auto flex w-full max-w-screen-lg items-center justify-between p-6 py-3">
				<Link to="/" className="flex h-10 items-center gap-1">
					<Logo />
				</Link>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-6">
						<a
							href="https://github.com/get-convex/convex-saas/tree/main/docs"
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({ variant: "link", size: "sm" }),
								"group flex gap-3 px-0 text-primary/80 hover:text-primary hover:no-underline",
							)}
						>
							Docs
						</a>
						<a
							href="https://github.com/get-convex/convex-saas"
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({ variant: "link", size: "sm" }),
								"group flex gap-3 px-0 text-primary/80 hover:text-primary hover:no-underline",
							)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-primary/80"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<title>GitHub</title>
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
							<span className="hidden select-none items-center gap-1 rounded-full bg-green-500/5 px-2 py-1 pr-2.5 text-xs font-medium tracking-tight text-green-600 ring-1 ring-inset ring-green-600/20 backdrop-blur-sm dark:bg-yellow-800/40 dark:text-yellow-100 dark:ring-yellow-200/50 md:flex">
								<Star
									className="h-3 w-3 text-green-600 dark:text-yellow-100"
									fill="currentColor"
								/>
								Star Us on GitHub
							</span>
						</a>
					</div>
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
						<SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
							<Button size={"sm"} disabled={isLoading}>
								{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
								{!isLoading && !isAuthenticated && "Get Started"}
							</Button>
						</SignInButton>
					</Unauthenticated>

					<Authenticated>
						<Link
							to={"/"}
							className={buttonVariants({ size: "sm" })}
							disabled={isLoading}
						>
							{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
							{!isLoading && isAuthenticated && "Dashboard"}
						</Link>
					</Authenticated>
				</div>
			</div>

			{/* Content */}
			<div className="z-10 mx-auto flex w-full max-w-screen-lg flex-col gap-4 px-6">
				<div className="z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-12 md:p-24">
					<Button
						variant="outline"
						className={cn(
							"hidden h-8 rounded-full bg-white/40 px-3 text-sm font-bold backdrop-blur hover:text-primary dark:bg-secondary md:flex",
						)}
					>
						<span className="flex items-center font-medium text-primary/60">
							Introducing
							<svg
								className="mx-1 h-[14px] w-[14px] text-primary"
								strokeLinejoin="round"
								viewBox="0 0 16 16"
							>
								<title>Convex SaaS</title>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
									fill="currentColor"
								/>
							</svg>
						</span>
						{siteConfig.siteTitle}
					</Button>
					<h1 className="text-center text-6xl font-bold leading-tight text-primary md:text-7xl lg:leading-tight">
						Production Ready
						<br />
						SaaS Stack for Convex
					</h1>
					<p className="max-w-screen-md text-center text-lg !leading-normal text-muted-foreground md:text-xl">
						Launch in hours with a modern{" "}
						<span className="font-medium text-primary">
							Production-Ready Stack
						</span>
						<br className="hidden lg:inline-block" /> Stripe integration.
						TanStack-powered. Open Source.
					</p>
					<div className="mt-2 flex w-full items-center justify-center gap-2">
						<Unauthenticated>
							<SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
								<Button size={"sm"} disabled={isLoading}>
									{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
									{!isLoading && !isAuthenticated && "Get Started"}
								</Button>
							</SignInButton>
						</Unauthenticated>

						<Authenticated>
							<Link
								to={"/"}
								className={buttonVariants({ size: "sm" })}
								disabled={isLoading}
							>
								{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
								{!isLoading && isAuthenticated && "Dashboard"}
							</Link>
						</Authenticated>
						<a
							href="https://github.com/get-convex/convex-saas/tree/main/docs"
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({ size: "sm", variant: "outline" }),
								"hidden dark:bg-secondary dark:hover:opacity-80 sm:flex",
							)}
						>
							Explore Documentation
						</a>
					</div>
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-2">
					<h2 className="text-center font-serif text-xl font-medium text-primary/60">
						Built for Developers
					</h2>
					<div className="my-8 flex flex-wrap items-center justify-center gap-10 gap-y-8 lg:gap-14">
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="Convex"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://convex.dev"
						>
							<div className="relative flex h-6 w-[148px] items-center justify-center">
								<svg
									width="382"
									height="146"
									viewBox="0 0 382 146"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="absolute h-20 w-auto"
								>
									<title>Convex</title>
									<path
										d="M114.794 86.6648C111.454 83.6785 109.784 79.2644 109.784 73.434C109.784 67.6036 111.487 63.1896 114.896 60.2033C118.301 57.217 122.959 55.721 128.865 55.721C131.319 55.721 133.486 55.8973 135.372 56.2613C137.258 56.6197 139.063 57.2283 140.786 58.0929V67.5524C138.106 66.2157 135.064 65.5445 131.659 65.5445C128.66 65.5445 126.445 66.1417 125.018 67.3363C123.586 68.5308 122.873 70.5615 122.873 73.434C122.873 76.2099 123.575 78.2178 124.986 79.4578C126.391 80.7035 128.617 81.3236 131.665 81.3236C134.891 81.3236 137.955 80.5329 140.862 78.9573V88.8547C137.636 90.3849 133.615 91.1471 128.801 91.1471C122.797 91.1471 118.133 89.6511 114.794 86.6648Z"
										fill="currentColor"
									/>
									<path
										d="M143.77 73.4279C143.77 67.643 145.337 63.246 148.471 60.2312C151.605 57.2165 156.328 55.7148 162.645 55.7148C169.006 55.7148 173.761 57.2222 176.922 60.2312C180.078 63.2403 181.656 67.643 181.656 73.4279C181.656 85.2366 175.318 91.1409 162.645 91.1409C150.06 91.1466 143.77 85.2423 143.77 73.4279ZM167.179 79.4574C168.109 78.2116 168.574 76.2037 168.574 73.4335C168.574 70.7089 168.109 68.7123 167.179 67.4439C166.25 66.1754 164.737 65.544 162.645 65.544C160.603 65.544 159.122 66.1811 158.214 67.4439C157.306 68.7123 156.853 70.7089 156.853 73.4335C156.853 76.2094 157.306 78.2173 158.214 79.4574C159.122 80.7031 160.597 81.3231 162.645 81.3231C164.737 81.3231 166.244 80.6974 167.179 79.4574Z"
										fill="currentColor"
									/>
									<path
										d="M184.638 56.4315H196.629L196.97 59.014C198.288 58.0583 199.969 57.2677 202.011 56.6477C204.054 56.0276 206.167 55.7148 208.35 55.7148C212.392 55.7148 215.343 56.7671 217.207 58.8718C219.071 60.9764 220.001 64.2244 220.001 68.627V90.4299H207.194V69.9865C207.194 68.4564 206.864 67.3585 206.205 66.6873C205.546 66.0161 204.443 65.6862 202.898 65.6862C201.947 65.6862 200.968 65.9137 199.969 66.3688C198.969 66.8239 198.131 67.4097 197.445 68.1265V90.4299H184.638V56.4315Z"
										fill="currentColor"
									/>
									<path
										d="M220.038 56.4317H233.391L239.524 76.3689L245.658 56.4317H259.011L246.268 90.4301H232.775L220.038 56.4317Z"
										fill="currentColor"
									/>
									<path
										d="M263.043 87.5062C259.195 84.4687 257.396 79.1957 257.396 73.5018C257.396 67.9558 258.828 63.3882 262.097 60.2312C265.366 57.0743 270.349 55.7148 276.639 55.7148C282.426 55.7148 286.976 57.1255 290.3 59.9468C293.618 62.7682 295.282 66.6191 295.282 71.4939V77.4494H270.927C271.532 79.2184 272.299 80.4983 274.185 81.289C276.071 82.0796 278.703 82.4721 282.07 82.4721C284.08 82.4721 286.133 82.3071 288.219 81.9715C288.954 81.8521 290.165 81.6644 290.802 81.5222V89.7871C287.619 90.6972 283.377 91.1523 278.595 91.1523C272.159 91.1466 266.89 90.5437 263.043 87.5062ZM281.826 70.1344C281.826 68.4507 279.984 64.8273 276.282 64.8273C272.942 64.8273 270.738 68.3938 270.738 70.1344H281.826Z"
										fill="currentColor"
									/>
									<path
										d="M305.338 73.1437L293.346 56.4317H307.245L331.773 90.4301H317.74L312.287 82.825L306.835 90.4301H292.865L305.338 73.1437Z"
										fill="currentColor"
									/>
									<path
										d="M317.431 56.4317H331.265L320.647 71.3178L313.622 61.7787L317.431 56.4317Z"
										fill="currentColor"
									/>
									<path
										d="M82.2808 87.6517C89.652 86.8381 96.6012 82.9353 100.427 76.4211C98.6156 92.5331 80.8853 102.717 66.413 96.4643C65.0795 95.8897 63.9316 94.9339 63.1438 93.705C59.8915 88.6302 58.8224 82.1729 60.3585 76.313C64.7475 83.8399 73.6717 88.4539 82.2808 87.6517Z"
										fill="currentColor"
									/>
									<path
										d="M60.0895 71.5852C57.1016 78.4464 56.9722 86.4797 60.6353 93.0906C47.7442 83.453 47.8848 62.8294 60.4778 53.2885C61.6425 52.4067 63.0267 51.8833 64.4785 51.8036C70.4486 51.4907 76.5144 53.7835 80.7683 58.0561C72.1254 58.1415 63.7076 63.643 60.0895 71.5852Z"
										fill="currentColor"
									/>
									<path
										d="M84.9366 60.1673C80.5757 54.1253 73.7503 50.0119 66.2722 49.8868C80.7277 43.3669 98.5086 53.9375 100.444 69.5659C100.624 71.0167 100.388 72.4959 99.7409 73.8044C97.04 79.2547 92.032 83.4819 86.1801 85.0464C90.4678 77.144 89.9388 67.4894 84.9366 60.1673Z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="TanStack"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://tanstack.com/router"
						>
							<svg
								className="h-12 w-auto"
								viewBox="0 0 633 633"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>TanStack</title>
								<circle cx="316.5" cy="316.5" r="316.5" fill="#fff" />
								<mask
									id="a"
									style={{ maskType: "luminance" }}
									maskUnits="userSpaceOnUse"
									x="0"
									y="0"
									width="633"
									height="633"
								>
									<circle cx="316.5" cy="316.5" r="316.5" fill="#fff" />
								</mask>
								<g mask="url(#a)" stroke="#000">
									<path
										d="M304 610.5c0 101.183-94.405 185.968-214.5 185.968S-125 711.683-125 610.5c0-101.183 94.405-185.968 214.5-185.968S304 509.317 304 610.5ZM758 610.5c0 101.183-94.405 185.968-214.5 185.968S329 711.683 329 610.5c0-101.183 94.405-185.968 214.5-185.968S758 509.317 758 610.5Z"
										strokeWidth="25"
									/>
									<path
										d="M304 648.5c0 101.183-94.405 185.968-214.5 185.968S-125 749.683-125 648.5c0-101.183 94.405-185.968 214.5-185.968S304 547.317 304 648.5ZM758 648.5c0 101.183-94.405 185.968-214.5 185.968S329 749.683 329 648.5c0-101.183 94.405-185.968 214.5-185.968S758 547.317 758 648.5Z"
										strokeWidth="25"
									/>
									<path
										d="M304 684.5c0 101.183-94.405 185.968-214.5 185.968S-125 785.683-125 684.5c0-101.183 94.405-185.968 214.5-185.968S304 583.317 304 684.5ZM758 684.5c0 101.183-94.405 185.968-214.5 185.968S329 785.683 329 684.5c0-101.183 94.405-185.968 214.5-185.968S758 583.317 758 684.5Z"
										strokeWidth="25"
									/>
									<path
										d="M570 715.5c0 170.018-115.444 304-253.5 304-138.056 0-253.5-133.982-253.5-304s115.444-304 253.5-304c138.056 0 253.5 133.982 253.5 304Z"
										fill="#fff"
										strokeWidth="25"
									/>
									<circle
										cx="565.5"
										cy="89.5"
										r="102"
										fill="#fff"
										strokeWidth="23"
									/>
									<path
										d="M428 90h-30M431.5 56.5 405 51M432 123l-29 8M443 154l-24 13M465 181l-20 19M492.373 204l-13.834 22.847M525.5 220.5 518 245M565.5 229.5l.5 24.5"
										strokeWidth="12"
										strokeLinecap="round"
										strokeLinejoin="bevel"
									/>
								</g>
								<circle
									cx="316.5"
									cy="316.5"
									r="304"
									stroke="#000"
									strokeWidth="25"
								/>
								<mask
									id="b"
									style={{ maskType: "luminance" }}
									maskUnits="userSpaceOnUse"
									x="0"
									y="0"
									width="633"
									height="633"
								>
									<circle
										cx="316.5"
										cy="316.5"
										r="304"
										fill="#fff"
										stroke="#fff"
										strokeWidth="25"
									/>
								</mask>
								<g mask="url(#b)">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M193.322 202.998c8.069 37.277 13.997 73.63 17.782 109.059 3.785 35.428 2.803 75.151-2.947 119.169l61.232-16.664c-15.624-59.046-25.16-97.899-28.606-116.559-3.447-18.66-10.832-51.846-22.155-99.557l-25.306 4.552"
										fill="#000"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M195.969 183.898s-12.6-22.116-36.455-29.892c-23.854-7.777-55.501 11.082-55.501 11.082s23.853 21.386 40.686 24.926c16.834 3.54 51.27-6.116 51.27-6.116Z"
										fill="#fff"
										stroke="#000"
										strokeWidth="13"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M195.937 184.501s-47.501-8.529-83.21 15.715c-35.708 24.245-31.59 99.348-31.59 99.348s45.506-41.755 65.244-61.885c19.738-20.129 49.556-53.178 49.556-53.178ZM195.969 183.898s-1.267-32.853 20.633-48.205c21.9-15.351 45.455-15.339 45.455-15.339s-9.096 32.041-25.161 43.356c-16.065 11.314-40.927 20.188-40.927 20.188Z"
										fill="#fff"
										stroke="#000"
										strokeWidth="13"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M195.937 184.501s47.842-45.056 96.703-29.04c48.862 16.015 54.608 59.082 54.608 59.082s-52.758-8.288-75.809-12.088c-23.052-3.799-75.502-17.954-75.502-17.954Z"
										fill="#fff"
										stroke="#000"
										strokeWidth="13"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M195.937 184.501s53.742-11.356 89.19 21.965c35.447 33.321 42.291 80.335 42.291 80.335s-59.636-14.566-85.496-42.37c-25.859-27.804-45.985-59.93-45.985-59.93ZM195.937 184.501s-50.376 20.716-60.134 65.628c-9.759 44.912 8.699 99.613 8.699 99.613s41.077-60.413 47.387-88c6.31-27.586 4.048-77.241 4.048-77.241Z"
										fill="#fff"
										stroke="#000"
										strokeWidth="13"
									/>
									<path
										d="M197.456 182.301s-22.221 32.415-30.819 59.39c-8.599 26.976-11.149 45.11-11.149 45.11"
										stroke="#000"
										strokeWidth="8"
										strokeLinecap="round"
									/>
									<path
										d="M195.847 185.673s-36.616 2.587-58.055 21.827c-21.44 19.24-31.304 37.82-31.304 37.82M205.543 176.367s44.562-10.094 67.018-5.047c22.457 5.047 35.843 15.858 35.843 15.858M197.514 181.438s30.388 14.812 53.908 31.917c23.52 17.104 35.078 32.04 35.078 32.04"
										stroke="#000"
										strokeWidth="8"
										strokeLinecap="round"
									/>
									<path
										clipRule="evenodd"
										d="m345.091 362.996 97.665 17.221s8.677 3.191 7.11 12.082c-1.568 8.891-10.979 9.856-10.979 9.856l-105.971-18.686-57.476-59.21s-4.79-7.263.762-12.81c5.552-5.547 13.675-2.121 13.675-2.121l55.214 53.668Z"
										stroke="#000"
										strokeWidth="11"
										strokeLinecap="round"
										strokeLinejoin="bevel"
									/>
									<path
										d="m437.018 403.22-5.036 28.56M291.97 341.479l-10.94 62.042M333.939 384.126l-4.335 27.079M429.253 384.461l.862-6.495M396.253 379.461l.862-6.495M363.247 373.522l.878-6.109M325.238 351.286l4.166-3.901M304.238 331.286l4.166-3.901"
										stroke="#000"
										strokeWidth="11"
										strokeLinecap="round"
										strokeLinejoin="bevel"
									/>
								</g>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="Polar"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://polar.sh"
						>
							<svg
								className="h-12 w-auto"
								viewBox="0 0 1020 300"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Polar</title>
								<path
									d="M397.382 244.212V53.4181H473.428C483.421 53.4181 492.508 55.962 500.684 61.0499C508.861 65.956 515.311 72.77 520.036 81.492C524.942 90.214 527.395 99.9354 527.395 110.656C527.395 121.74 524.942 131.735 520.036 140.638C515.311 149.542 508.861 156.629 500.684 161.898C492.508 167.167 483.421 169.802 473.428 169.802H421.096V244.212H397.382ZM421.096 146.634H473.972C479.424 146.634 484.33 145.09 488.692 142.001C493.052 138.73 496.505 134.369 499.049 128.918C501.593 123.467 502.865 117.379 502.865 110.656C502.865 104.115 501.593 98.3 499.049 93.2122C496.505 88.1244 493.052 84.0359 488.692 80.9468C484.33 77.8578 479.424 76.3133 473.972 76.3133H421.096V146.634Z"
									fill="currentColor"
								/>
								<path
									d="M615.217 246.937C601.226 246.937 588.688 243.757 577.604 237.397C566.701 230.856 558.071 222.043 551.711 210.959C545.351 199.693 542.171 186.883 542.171 172.528C542.171 158.173 545.351 145.453 551.711 134.369C558.071 123.284 566.701 114.563 577.604 108.203C588.688 101.843 601.226 98.6634 615.217 98.6634C629.209 98.6634 641.656 101.843 652.559 108.203C663.643 114.563 672.274 123.284 678.452 134.369C684.811 145.453 687.991 158.173 687.991 172.528C687.991 186.883 684.811 199.693 678.452 210.959C672.274 222.043 663.643 230.856 652.559 237.397C641.656 243.757 629.209 246.937 615.217 246.937ZM615.217 225.677C624.848 225.677 633.389 223.406 640.838 218.863C648.288 214.139 654.103 207.779 658.283 199.784C662.644 191.789 664.733 182.704 664.552 172.528C664.733 162.352 662.644 153.358 658.283 145.544C654.103 137.549 648.288 131.28 640.838 126.737C633.389 122.195 624.848 119.923 615.217 119.923C605.587 119.923 596.956 122.195 589.324 126.737C581.874 131.28 576.059 137.549 571.88 145.544C567.701 153.539 565.612 162.534 565.612 172.528C565.612 182.704 567.701 191.789 571.88 199.784C576.059 207.779 581.874 214.139 589.324 218.863C596.956 223.406 605.587 225.677 615.217 225.677Z"
									fill="currentColor"
								/>
								<path
									d="M712.897 244.212V42.5156H735.792V244.212H712.897Z"
									fill="currentColor"
								/>
								<path
									d="M826.119 246.937C813.945 246.937 802.86 243.757 792.866 237.397C783.054 230.856 775.241 221.952 769.426 210.686C763.612 199.421 760.704 186.701 760.704 172.528C760.704 158.173 763.702 145.453 769.698 134.369C775.695 123.284 783.69 114.563 793.684 108.203C803.86 101.843 815.217 98.6634 827.754 98.6634C835.204 98.6634 842.019 99.7537 848.196 101.934C854.556 104.115 860.189 107.204 865.096 111.201C870.001 115.017 874.09 119.56 877.361 124.829C880.631 129.917 882.811 135.368 883.902 141.184L877.906 138.457L878.178 101.662H901.073V244.212H878.178V209.597L883.902 206.598C882.63 211.867 880.177 216.955 876.542 221.862C873.09 226.768 868.729 231.128 863.46 234.944C858.372 238.579 852.648 241.486 846.288 243.666C839.928 245.846 833.206 246.937 826.119 246.937ZM831.57 225.404C840.838 225.404 849.014 223.134 856.1 218.591C863.188 214.048 868.821 207.87 873 200.057C877.179 192.061 879.269 182.885 879.269 172.528C879.269 162.352 877.179 153.358 873 145.544C869.002 137.731 863.369 131.552 856.1 127.01C849.014 122.467 840.838 120.196 831.57 120.196C822.303 120.196 814.126 122.467 807.04 127.01C799.953 131.552 794.32 137.731 790.14 145.544C786.143 153.358 784.145 162.352 784.145 172.528C784.145 182.704 786.143 191.789 790.14 199.784C794.32 207.779 799.953 214.048 807.04 218.591C814.126 223.134 822.303 225.404 831.57 225.404Z"
									fill="currentColor"
								/>
								<path
									d="M930.49 244.212V101.662H953.386L953.931 141.728L951.478 134.914C953.476 128.191 956.747 122.104 961.29 116.652C965.832 111.201 971.193 106.84 977.371 103.569C983.73 100.299 990.454 98.6634 997.54 98.6634C1000.63 98.6634 1003.54 98.936 1006.26 99.4811C1009.17 99.8446 1011.53 100.39 1013.35 101.116L1007.08 126.464C1004.72 125.375 1002.27 124.556 999.721 124.012C997.177 123.467 994.814 123.194 992.634 123.194C986.82 123.194 981.46 124.284 976.553 126.464C971.829 128.645 967.74 131.644 964.288 135.46C961.017 139.093 958.383 143.364 956.383 148.27C954.567 153.176 953.658 158.446 953.658 164.078V244.212H930.49Z"
									fill="currentColor"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M64.8636 269.177C130.906 313.882 220.684 296.585 265.388 230.543C310.094 164.501 292.798 74.723 226.756 30.0179C160.714 -14.6872 70.935 2.60972 26.2299 68.6516C-18.4753 134.693 -1.17834 224.472 64.8636 269.177ZM84.0172 270.357C144.43 301.264 221.064 272.251 255.187 205.557C289.309 138.861 267.997 59.7378 207.584 28.8301C147.173 -2.0774 70.5375 26.9345 36.4152 93.63C2.29299 160.325 23.6051 239.448 84.0172 270.357Z"
									fill="currentColor"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M101.233 286.13C155.766 303.879 219.918 256.991 244.522 181.401C269.124 105.812 244.86 30.146 190.327 12.3967C135.794 -5.35246 71.6428 41.5362 47.04 117.126C22.4374 192.715 46.7007 268.381 101.233 286.13ZM117.915 280.385C164.066 290.229 213.97 239.649 229.378 167.414C244.784 95.1779 219.862 28.6392 173.71 18.7955C127.559 8.95174 77.6556 59.5307 62.2482 131.767C46.841 204.002 71.7639 270.541 117.915 280.385Z"
									fill="currentColor"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M130.567 292.297C167.056 296.192 203.471 235.332 211.903 156.36C220.336 77.3886 197.592 10.2109 161.104 6.3148C124.616 2.41866 88.2006 63.2795 79.7681 142.251C71.3357 221.222 94.0792 288.401 130.567 292.297ZM147.642 268.26C174.048 267.843 194.616 214.386 193.58 148.861C192.546 83.3351 170.299 30.5544 143.893 30.9716C117.486 31.3889 96.9186 84.8459 97.9538 150.372C98.9891 215.897 121.235 268.677 147.642 268.26Z"
									fill="currentColor"
								/>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="TailwindCSS"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://tailwindcss.com"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 54 33"
								className="h-8 w-auto"
							>
								<title>TailwindCSS</title>
								<g clipPath="url(#prefix__clip0)">
									<path
										fill="#38bdf8"
										fillRule="evenodd"
										d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
										clipRule="evenodd"
									/>
								</g>
								<defs>
									<clipPath id="prefix__clip0">
										<path fill="#fff" d="M0 0h54v32.4H0z" />
									</clipPath>
								</defs>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="Clerk"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://clerk.com"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-auto"
							>
								<title>Clerk</title>
								<path
									d="m21.47 20.829 -2.881 -2.881a0.572 0.572 0 0 0 -0.7 -0.084 6.854 6.854 0 0 1 -7.081 0 0.576 0.576 0 0 0 -0.7 0.084l-2.881 2.881a0.576 0.576 0 0 0 -0.103 0.69 0.57 0.57 0 0 0 0.166 0.186 12 12 0 0 0 14.113 0 0.58 0.58 0 0 0 0.239 -0.423 0.576 0.576 0 0 0 -0.172 -0.453Zm0.002 -17.668 -2.88 2.88a0.569 0.569 0 0 1 -0.701 0.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0 -1.222 3.692 6.86 6.86 0 0 0 0.978 3.764 0.573 0.573 0 0 1 -0.083 0.699l-2.881 2.88a0.567 0.567 0 0 1 -0.864 -0.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637 -0.405 0.566 0.566 0 0 1 0.232 0.418 0.57 0.57 0 0 1 -0.168 0.448Zm-7.118 12.261a3.427 3.427 0 1 0 0 -6.854 3.427 3.427 0 0 0 0 6.854Z"
									fill="#38bdf8"
									strokeWidth="1"
								/>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							aria-label="shadcn/ui"
							className="flex items-center text-primary opacity-80 grayscale transition hover:opacity-100"
							href="https://ui.shadcn.com/"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 256 256"
								className="h-10 w-10"
							>
								<title>shadcn/ui</title>
								<rect width={256} height={256} fill="none" />
								<line
									x1={208}
									y1={128}
									x2={128}
									y2={208}
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={16}
								/>
								<line
									x1={192}
									y1={40}
									x2={40}
									y2={192}
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={16}
								/>
							</svg>
						</a>
					</div>
				</div>
				<div className="relative z-10 flex flex-col border border-border backdrop-blur-sm lg:flex-row">
					<div className="flex w-full flex-col items-start justify-center gap-6 border-r border-primary/10 p-10 lg:p-12">
						<p className="h-14 text-lg text-primary/60">
							<span className="font-semibold text-primary">
								Production Ready.
							</span>{" "}
							Build your app on a solid, scalable, well-tested foundation.
						</p>
						<Unauthenticated>
							<SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
								<Button size={"sm"} disabled={isLoading}>
									{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
									{!isLoading && !isAuthenticated && "Get Started"}
								</Button>
							</SignInButton>
						</Unauthenticated>

						<Authenticated>
							<Link
								to={"/"}
								className={buttonVariants({ size: "sm" })}
								disabled={isLoading}
							>
								{isLoading && <Loader2 className="animate-spin w-16 h-4" />}
								{!isLoading && isAuthenticated && "Dashboard"}
							</Link>
						</Authenticated>
					</div>
					<div className="flex w-full flex-col items-start justify-center gap-6 p-10 lg:w-[60%] lg:border-b-0 lg:p-12">
						<p className="h-14 text-lg text-primary/60">
							<span className="font-semibold text-primary">Ready to Ship.</span>{" "}
							Deployments ready with a single command.
						</p>
						<a
							href="https://github.com/get-convex/convex-saas/tree/main/docs"
							target="_blank"
							rel="noreferrer"
							className={cn(
								`${buttonVariants({ variant: "outline", size: "sm" })} dark:bg-secondary dark:hover:opacity-80`,
							)}
						>
							Explore Documentation
						</a>
					</div>

					<div className="absolute left-0 top-0 z-10 flex flex-col items-center justify-center">
						<span className="absolute h-6 w-[1px] bg-primary/40" />
						<span className="absolute h-[1px] w-6 bg-primary/40" />
					</div>
					<div className="absolute bottom-0 right-0 z-10 flex flex-col items-center justify-center">
						<span className="absolute h-6 w-[1px] bg-primary/40" />
						<span className="absolute h-[1px] w-6 bg-primary/40" />
					</div>
				</div>
				<div className="z-10 flex h-full w-full flex-col items-center justify-center gap-6 p-12">
					<h1 className="text-center text-4xl font-bold leading-tight text-primary md:text-6xl">
						Proudly Open Source
					</h1>
					<p className="text-center text-lg text-primary/60">
						Convex SaaS is a fully Open Source project.
						<br />
						The code is available on GitHub.
					</p>
					<a
						href="https://github.com/get-convex/convex-saas"
						target="_blank"
						rel="noreferrer"
						className="hidden h-10 select-none items-center gap-2 rounded-full bg-green-500/5 px-2 py-1 pr-2.5 text-base font-medium tracking-tight text-green-600 ring-1 ring-inset ring-green-600/20 backdrop-blur-sm dark:bg-yellow-800/40 dark:text-yellow-100 dark:ring-yellow-200/50 md:flex"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-green-600 dark:text-yellow-100"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<title>GitHub</title>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						Star Us on GitHub
					</a>
				</div>
			</div>

			{/* Footer */}
			<footer className="z-10 flex w-full flex-col items-center justify-center gap-8 py-6">
				<a
					href="https://twitter.com/convex_dev"
					target="_blank"
					rel="noreferrer"
					className="flex items-center justify-center hover:scale-110"
				>
					<svg
						className="h-8 w-8 text-primary"
						strokeLinejoin="round"
						viewBox="0 0 16 16"
					>
						<title>Convex Twitter</title>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
							fill="currentColor"
						/>
					</svg>
				</a>

				<ThemeSwitcherHome />

				<div className="flex flex-col items-center gap-2 sm:flex-row">
					<p className="flex items-center whitespace-nowrap text-center text-sm font-medium text-primary/60">
						Based on&nbsp;
						<a
							href="https://remix-saas.fly.dev"
							target="_blank"
							rel="noreferrer"
							className="flex items-center text-primary hover:text-primary hover:underline"
						>
							the Open-Source Remix SaaS by&nbsp;
						</a>
						<p className="flex items-center whitespace-nowrap text-center text-sm font-medium text-primary/60">
							<a href="https://bento.me/danielkanem?utm_source=remixconvexsaas">
								DanielKanem.
							</a>
						</p>
					</p>
					<p className="flex items-center whitespace-nowrap text-center text-sm font-medium text-primary/60">
						Source code available on&nbsp;{" "}
						<a
							href="https://github.com/get-convex/convex-saas"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center text-primary hover:text-primary hover:underline"
						>
							GitHub.
						</a>
					</p>
				</div>
			</footer>

			{/* Background */}
			<img
				src={ShadowPNG}
				alt="Hero"
				className={`fixed left-0 top-0 z-0 h-full w-full opacity-60 ${theme === "dark" ? "invert" : ""}`}
			/>
			<div className="base-grid fixed h-screen w-screen opacity-40" />
			<div className="fixed bottom-0 h-screen w-screen bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
		</div>
	);
}
