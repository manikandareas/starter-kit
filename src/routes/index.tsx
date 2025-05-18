import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/clerk-react";
import { api } from "@cvx/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const tasks = useQuery(api.tasks.get);
	return (
		<div className="App">
			<header>
				<SignedOut>
					<SignInButton mode="modal" fallbackRedirectUrl={"/"} />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>
			{tasks?.map(({ _id, text }) => (
				<div key={_id}>{text}</div>
			))}
		</div>
	);
}
