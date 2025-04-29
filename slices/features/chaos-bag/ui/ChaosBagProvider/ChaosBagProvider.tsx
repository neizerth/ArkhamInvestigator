import type { PropsWithChildren } from "react";
import * as C from "./ChaosBagProvider.components";

export type ChaosBagProviderProps = PropsWithChildren;

export const ChaosBagProvider = ({ children }: ChaosBagProviderProps) => {
	return (
		<>
			{children}
			<C.Modal />
		</>
	);
};
