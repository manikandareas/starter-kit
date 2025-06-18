import { LogOut, Menu, Moon, Settings, Sun } from "lucide-react";

import { Button } from "@/components/retroui/button";
import { Text } from "@/components/retroui/text";
import { useTheme } from "@/components/theme-provider";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/clerk-react";
import type { Doc } from "@cvx/_generated/dataModel";
import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";

export function Navigation({ user }: { user: Doc<"users"> }) {
	const matchRoute = useMatchRoute();
	const navigate = useNavigate();
	const isDashboardPath = matchRoute({ to: "/dashboard" });
	const isSettingsPath = matchRoute({ to: "/dashboard/settings" });
	const { setTheme, theme } = useTheme();

	if (!user) {
		return null;
	}
	return (
		<nav className="sticky top-0 z-[10] flex w-full flex-col border-b border-border bg-card px-6">
			<div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-3">
				<div className="flex h-10 items-center gap-2">
					<Link to={"/"} className="flex h-10 items-center gap-1">
						<Logo />
					</Link>

					<div className="hidden md:flex items-center gap-3 ml-4">
						<Link to={"/dashboard"}>
							<Button
								variant={"link"}
								className={cn(" text-sm text-foreground", {
									underline: isDashboardPath,
								})}
							>
								<Text as={"p"}>Dasboard</Text>
							</Button>
						</Link>
						<Link to={"/dashboard/settings"}>
							<Button
								variant={"link"}
								className={cn(" text-sm text-foreground", {
									underline: isSettingsPath,
								})}
							>
								<Text as={"p"}>Settings</Text>
							</Button>
						</Link>
					</div>
				</div>

				<div className="flex h-10 items-center gap-3">
					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="link"
									size="icon"
									className="text-foreground hover:bg-accent/20 p-2 rounded-md"
								>
									<Menu className="h-6 w-6" />
									<span className="sr-only">Menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								sideOffset={8}
								align="end"
								className="bg-card border-border shadow-md w-48"
							>
								<DropdownMenuItem asChild>
									<Link
										to="/dashboard"
										className={cn(
											"w-full flex justify-start items-center px-2 py-1.5 text-sm",
											isDashboardPath
												? "text-primary font-semibold"
												: "text-foreground",
										)}
									>
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										to="/dashboard/settings"
										className={cn(
											"w-full flex justify-start items-center px-2 py-1.5 text-sm",
											isSettingsPath
												? "text-primary font-semibold"
												: "text-foreground",
										)}
									>
										Settings
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button
								variant="link"
								className="h-10 w-10 rounded-full p-0 hover:bg-accent/50"
							>
								{user.profileImage ? (
									<img
										className="h-10 w-10 rounded-full border-2 border-black object-cover"
										alt={user.username ?? user.email}
										src={user.profileImage}
									/>
								) : (
									<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-primary text-sm font-medium text-foreground">
										{(user?.username || user?.email || "U")
											.charAt(0)
											.toUpperCase()}
									</div>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							sideOffset={8}
							align="end"
							className="bg-background"
						>
							<DropdownMenuItem className="flex-col items-start">
								<p className="text-sm font-medium text-foreground">
									{user?.username || ""}
								</p>
								<p className="text-sm text-muted-foreground">{user?.email}</p>
							</DropdownMenuItem>

							<DropdownMenuSeparator className="mx-0 my-2 h-[1px] bg-border" />
							<DropdownMenuItem className="inline-flex items-center justify-between w-full">
								<p>Theme:</p>{" "}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="icon">
											<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
											<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
											<span className="sr-only">Toggle theme</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										defaultValue={theme}
										align="end"
										className="bg-background"
									>
										<DropdownMenuItem onClick={() => setTheme("light")}>
											Light
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setTheme("dark")}>
											Dark
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setTheme("system")}>
											System
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</DropdownMenuItem>

							<DropdownMenuSeparator className="mx-0 my-2 h-[1px] bg-border" />

							<DropdownMenuItem
								className="h-9 w-full cursor-pointer justify-between rounded-md px-2"
								onClick={() => navigate({ to: "/dashboard/settings" })}
							>
								<span className="text-sm text-foreground">Pengaturan</span>
								<Settings className="h-[18px] w-[18px] stroke-[1.5px] text-muted-foreground" />
							</DropdownMenuItem>

							<DropdownMenuSeparator className="mx-0 my-2 h-[1px] bg-border" />

							<SignOutButton redirectUrl="/">
								<DropdownMenuItem className="flex h-9 items-center justify-between rounded-md px-2">
									<span className="text-sm text-foreground">Log Out</span>
									<LogOut className="h-[18px] w-[18px] stroke-[1.5px] text-muted-foreground" />
								</DropdownMenuItem>
							</SignOutButton>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
}
