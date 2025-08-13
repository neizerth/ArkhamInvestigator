import { selectAssetsLoaded } from "@modules/core/assets/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { AppLoader } from "../../AppLoader";

export const AppLoadProvider = ({ children }: PropsWithChildren) => {
	const loaded = useAppSelector(selectAssetsLoaded);

	if (!loaded) {
		return <AppLoader />;
	}

	return children;
};
