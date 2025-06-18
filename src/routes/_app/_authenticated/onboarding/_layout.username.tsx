import { Button } from "@/components/retroui/button";
import { Input } from "@/components/retroui/input";
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
export const usernameSchema = z.object({
	username: z
		.string()
		.min(3, "Username harus minimal 3 karakter")
		.max(20, "Username harus maksimal 20 karakter")
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"Username hanya boleh berisi huruf, angka, dan underscore",
		),
});
export default function OnboardingUsername() {
	const navigate = useNavigate();
	const { data: user } = useQuery(convexQuery(api.users.getCurrentUser, {}));
	const { mutateAsync: completeOnboardingUsernameStep, isPending } =
		useMutation({
			mutationFn: useConvexMutation(api.app.completeOnboarding),
			onSuccess: () => {},
		});
	const form = useForm({
		defaultValues: { username: "" },
		onSubmit: async ({ value }) => {
			await completeOnboardingUsernameStep({
				username: value.username,
			});
		},
		validators: { onChange: usernameSchema },
	});
	useEffect(() => {
		if (user?.alreadyOnboarded) {
			navigate({ to: "/dashboard" });
		}
	}, [user]);
	return (
		<div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
			{" "}
			<div className="flex flex-col items-center gap-2">
				{" "}
				<span className="mb-2 select-none text-6xl">👋</span>{" "}
				<h3 className="text-center text-2xl font-medium text-primary">
					{" "}
					Selamat datang!{" "}
				</h3>{" "}
				<p className="text-center text-base font-normal">
					{" "}
					Mari kita mulai dengan memilih username.
				</p>
			</div>{" "}
			<form
				className="flex w-full flex-col items-start gap-1"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				{" "}
				<div className="flex w-full flex-col gap-1.5">
					{" "}
					<label htmlFor="username" className="sr-only">
						{" "}
						Username{" "}
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
								className={`${field.state.meta?.errors.length > 0 && "border-destructive focus-visible:ring-destructive"}`}
							/>
						)}
					/>{" "}
				</div>
				<div className="flex flex-col">
					{" "}
					{form.state.fieldMeta.username?.errors.length > 0 && (
						<span className="mb-2 text-sm text-destructive">
							{" "}
							{form.state.fieldMeta.username?.errors[0].message}{" "}
						</span>
					)}{" "}
				</div>
				<Button type="submit" size="sm" className="w-full justify-center">
					{" "}
					{isPending ? <Loader2 className="animate-spin" /> : "Lanjutkan"}{" "}
				</Button>
			</form>{" "}
			<p className="px-6 text-center text-sm font-normal leading-normal text-muted-foreground">
				Anda dapat mengupdate username kapan saja dari pengaturan akun Anda.
			</p>{" "}
		</div>
	);
}
