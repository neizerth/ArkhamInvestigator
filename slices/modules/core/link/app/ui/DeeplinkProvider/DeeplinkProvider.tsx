import { useDeeplinkChanges } from "@modules/core/link/shared/lib";
import type { PropsWithChildren } from "react";

export const DeeplinkProvider = ({ children }: PropsWithChildren) => {
	useDeeplinkChanges();
	return children;
};
