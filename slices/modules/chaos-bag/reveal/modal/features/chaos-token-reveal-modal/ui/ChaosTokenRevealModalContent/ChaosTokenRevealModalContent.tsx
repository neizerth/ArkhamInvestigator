import { selectChaosBagLoadingAnimation } from "@modules/chaos-bag/base/shared/lib";
import { useAppSelector, useBoolean } from "@shared/lib";

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
	const [loaded, setLoaded] = useBoolean(!animate);

	if (!loaded) {
		return <C.Loader style={loaderStyle} onLoad={setLoaded.on} show />;
	}

	return <C.Container {...props} />;
};
