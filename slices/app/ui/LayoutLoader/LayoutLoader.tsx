import { useAppLoader } from "@app/lib";
import type { PropsWithChildren } from "react";
import * as C from "./LayoutLoader.components";

export type LayoutLoaderProps = PropsWithChildren;

export const LayoutLoader = ({ children }: LayoutLoaderProps) => {
	const status = useAppLoader();
	if (!status.done) {
		return <C.Loader state={status} />;
	}

	return children;
};
