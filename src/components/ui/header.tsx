import { useHeader } from "../header-provider";

export function Header() {
	const { headerConfig } = useHeader();
	return (
		<header className="z-10 flex w-full flex-col border-b border-border bg-card px-6">
			<div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-12">
				<div className="flex flex-col items-start gap-2">
					<h1 className="text-3xl font-medium text-primary/80">
						{headerConfig?.headerTitle}
					</h1>
					<p className="text-base font-normal text-primary/60">
						{headerConfig?.headerDescription}
					</p>
				</div>
			</div>
		</header>
	);
}
