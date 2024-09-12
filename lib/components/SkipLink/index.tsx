import { ReactNode } from "react";

interface SkipLinkProps {
    href: string;
    children: ReactNode;
}
const SkipLink = ({href, children}: SkipLinkProps) => (
	<a
		className="absolute left-1/2 -translate-x-1/2 translate-y-[-200%] transition-transform focus:translate-y-0"
		href={href}
	>
		{children}
	</a>
);

export default SkipLink;
