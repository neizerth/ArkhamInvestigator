import { selectAppLoaded } from "@modules/core/app/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { AppLoader } from "../../AppLoader";

export const AppLoadProvider = ({ children }: PropsWithChildren) => {
	const loaded = useAppSelector(selectAppLoaded);

	if (!loaded) {
		return <AppLoader />;
	}

	return children;
};
