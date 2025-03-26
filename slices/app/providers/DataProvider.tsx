import { useAppData } from "@app/lib";
import type { PropsWithChildren } from "react";

export const DataProvider = ({ children }: PropsWithChildren) => {
	useAppData();
	return children;
};
