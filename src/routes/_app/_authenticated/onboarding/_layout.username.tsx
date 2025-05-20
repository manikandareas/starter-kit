import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

export const Route = createFileRoute(
	"/_app/_authenticated/onboarding/_layout/username",
)({
	component: OnboardingUsername,
	ssr: true,
});

const onboardingSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long")
		.max(20, "Username must be at most 20 characters long")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username can only contain letters, numbers, and underscores",
		),
});

export default function OnboardingUsername() {
	const navigate = useNavigate();
	const { data: user } = useQuery(convexQuery(api.users.getCurrentUser, {}));

	const { mutateAsync: completeOnboarding, isPending } = useMutation({
		mutationFn: useConvexMutation(api.app.completeOnboarding),
		onSuccess: () => {
			navigate({ to: "/dashboard" });
		},
	});

	const form = useForm({
		defaultValues: {
			username: "",
		},
		onSubmit: async ({ value }) => {
			await completeOnboarding({
				username: value.username,
			});
		},
		validators: {
			onChange: onboardingSchema,
		},
	});

	useEffect(() => {
		if (user?.alreadyOnboarded) {
			navigate({ to: "/dashboard" });
		}
	}, [user]);

	return (
		<div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center gap-2">
				<span className="mb-2 select-none text-6xl">👋</span>
				<h3 className="text-center text-2xl font-medium text-primary">
					Welcome!
				</h3>
				<p className="text-center text-base font-normal text-primary/60">
					Let's get started by choosing a username.
				</p>
			</div>
			<form
				className="flex w-full flex-col items-start gap-1"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="flex w-full flex-col gap-1.5">
					<label htmlFor="username" className="sr-only">
						Username
					</label>
					<form.Field
						name="username"
						children={(field) => (
							<Input
								placeholder="Username"
								autoComplete="off"
								required
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className={`bg-transparent ${
									field.state.meta?.errors.length > 0 &&
									"border-destructive focus-visible:ring-destructive"
								}`}
							/>
						)}
					/>
				</div>

				<div className="flex flex-col">
					{form.state.fieldMeta.username?.errors.length > 0 && (
						<span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
							{form.state.fieldMeta.username?.errors.join(" ")}
						</span>
					)}
				</div>

				<Button type="submit" size="sm" className="w-full">
					{isPending ? <Loader2 className="animate-spin" /> : "Continue"}
				</Button>
			</form>

			<p className="px-6 text-center text-sm font-normal leading-normal text-primary/60">
				You can update your username at any time from your account settings.
			</p>
		</div>
	);
}
