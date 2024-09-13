import type { ReactNode } from "react";

interface RootProps {
	children: ReactNode;
}
const Root = ({ children }: RootProps) => (
	<div style={{ position: "absolute", inset: 0 }}>{children}</div>
);

export default Root;
