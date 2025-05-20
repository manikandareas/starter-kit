import { Monitor, Moon, Sun } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme-provider";

const themes = ["light", "dark", "system"] as const;

export function ThemeSwitcher({ triggerClass }: { triggerClass?: string }) {
	const { setTheme, theme } = useTheme();
	return (
		<Select
			value={theme}
			onValueChange={(theme) => setTheme(theme as (typeof themes)[number])}
		>
			<SelectTrigger
				className={cn(
					"h-6 rounded border-primary/20 bg-secondary !px-2 hover:border-primary/40",
					triggerClass,
				)}
			>
				<div className="flex items-start gap-2">
					{theme === "light" ? (
						<Sun className="h-[14px] w-[14px]" />
					) : theme === "dark" ? (
						<Moon className="h-[14px] w-[14px]" />
					) : (
						<Monitor className="h-[14px] w-[14px]" />
					)}
					<span className="text-xs font-medium">
						{theme.charAt(0).toUpperCase() + theme.slice(1)}
					</span>
				</div>
			</SelectTrigger>
			<SelectContent>
				{themes.map((t) => (
					<SelectItem
						key={t}
						value={t}
						className={`text-sm font-medium text-primary/60 ${t === theme && "text-primary"}`}
					>
						{t && t.charAt(0).toUpperCase() + t.slice(1)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export function ThemeSwitcherHome() {
	const { setTheme } = useTheme();
	return (
		<div className="flex gap-3">
			{themes.map((theme) => (
				<button
					key={theme}
					name="theme"
					type="button"
					onClick={() => setTheme(theme)}
				>
					{theme === "light" ? (
						<Sun className="h-4 w-4 text-primary/80 hover:text-primary" />
					) : theme === "dark" ? (
						<Moon className="h-4 w-4 text-primary/80 hover:text-primary" />
					) : (
						<Monitor className="h-4 w-4 text-primary/80 hover:text-primary" />
					)}
				</button>
			))}
		</div>
	);
}
