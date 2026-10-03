import { useRouteChanges } from "@modules/core/router/entities/lib";
import type { PropsWithChildren } from "react";

export const RouterProvider = ({ children }: PropsWithChildren) => {
	useRouteChanges();
	return children;
};
