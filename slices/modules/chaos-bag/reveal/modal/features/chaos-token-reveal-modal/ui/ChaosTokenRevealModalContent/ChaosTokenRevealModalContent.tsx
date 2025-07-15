import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import { useAppSelector, useBoolean } from "@shared/lib";

import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ChaosTokenRevealModalContent.components";

export type ChaosTokenRevealModalContentProps = ViewProps & {
	loaderStyle?: ViewProps["style"];
};

export const ChaosTokenRevealModalContent = ({
	loaderStyle,
	...props
}: ChaosTokenRevealModalContentProps) => {
	const animate = useAppSelector(selectChaosBagLoadingAnimation);
	const revealedCount = useAppSelector(selectRevealedTokensCount);
	const [loaded, setLoaded] = useBoolean(!animate);

	if (!loaded) {
		return <C.Loader style={loaderStyle} onLoad={setLoaded.on} show />;
	}

	if (revealedCount === 0) {
		return;
	}

	return <C.Container {...props} />;
};
