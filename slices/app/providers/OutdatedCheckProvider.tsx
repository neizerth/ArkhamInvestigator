import { useOutdatedApp } from "@app/lib/hooks/useOutdatedApp";
import type { PropsWithChildren } from "react";

export const OutdatedCheckProvider = ({ children }: PropsWithChildren) => {
	useOutdatedApp();
	return children;
};
