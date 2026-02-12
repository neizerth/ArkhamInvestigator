import type { PropsWithChildren } from "react";
import { useAppState } from "./useAppState";

export const AppStateProvider = ({ children }: PropsWithChildren) => {
	useAppState();
	return children;
};
