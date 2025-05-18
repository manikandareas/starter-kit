import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS classnames with support for conditional classes.
 * Widely used for Radix components.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Returns a function that calls all of its arguments.
 */
export function callAll<Args extends unknown[]>(
	...fns: (((...args: Args) => unknown) | undefined)[]
) {
	return (...args: Args) => {
		for (const fn of fns) {
			fn?.(...args);
		}
	};
}

// export const useSignOut = () => {
// 	const router = useRouter();
// 	const navigate = useNavigate();
// 	const { signOut } = useAuthActions();

// 	return async () => {
// 		await signOut();
// 		router.invalidate();
// 		navigate({ to: "/login" });
// 	};
// };
