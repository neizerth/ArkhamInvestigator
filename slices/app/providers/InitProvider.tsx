import { useAppInit } from "@app/lib";
import type { PropsWithChildren } from "react";

export const InitProvider = ({ children }: PropsWithChildren) => {
	useAppInit();
	return children;
};
