import { useAppTranslation } from "@features/index";
import { selectAppOutdated, useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";

export const OutdatedAppProvider = ({ children }: PropsWithChildren) => {
	const { t } = useAppTranslation();
	const outdated = useAppSelector(selectAppOutdated);

	if (!outdated) {
		return children;
	}

	return <></>;
};
