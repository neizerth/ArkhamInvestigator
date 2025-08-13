import type { PropsWithChildren } from "react";
import { AppLoader } from "../../AppLoader";
import { useAppLoad } from "./useAppLoad";

export const AppLoadProvider = ({ children }: PropsWithChildren) => {
	const loaded = useAppLoad();

	if (!loaded) {
		return <AppLoader />;
	}

	return children;
};
