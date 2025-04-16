import type { ViewProps } from "react-native";

import {
	selectCurrentIsDefeated,
	selectCurrentTurnEnd,
	useAppSelector,
} from "@shared/lib";
import { Grayscale, Normal } from "react-native-color-matrix-image-filters";

export type InvestigatorImageEffectsProps = ViewProps;

export const InvestigatorImageEffects = (
	props: InvestigatorImageEffectsProps,
) => {
	const isTurnEnd = useAppSelector(selectCurrentTurnEnd);
	const isDefeated = useAppSelector(selectCurrentIsDefeated);
	const grayscale = isTurnEnd || isDefeated;

	if (!grayscale) {
		return <Normal {...props} />;
	}

	// return null;
	return <Grayscale {...props} />;
};
