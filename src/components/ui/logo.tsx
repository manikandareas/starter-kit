import { Container } from "lucide-react";

interface LogoProps {
	width?: number;
	height?: number;
	className?: string;
	[key: string]: unknown | undefined;
}

export function Logo({ width, height, className, ...args }: LogoProps) {
	return (
		<Container width={width} height={height} className={className} {...args} />
	);
}
