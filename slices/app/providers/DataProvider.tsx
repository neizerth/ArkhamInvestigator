import { useAppData } from "@shared/lib";
import { Loader } from "@shared/ui";
import type { PropsWithChildren } from "react";

export const DataProvider = ({ children }: PropsWithChildren) => {
	useAppData();
	return children;
};
