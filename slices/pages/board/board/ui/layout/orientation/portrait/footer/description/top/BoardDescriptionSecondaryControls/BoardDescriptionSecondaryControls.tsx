import {
	selectShowDoom,
	selectShowScenarioClues,
	selectShowScenarioResources,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	ScenarioClues,
	ScenarioDoom,
	ScenarioResources,
} from "../../../../../../../shared";
import * as C from "./BoardDescriptionSecondaryControls.components";

export type BoardDescriptionSecondaryControlsProps = ViewProps;

export const BoardDescriptionSecondaryControls = (
	props: BoardDescriptionSecondaryControlsProps,
) => {
	const showDoom = useAppSelector(selectShowDoom);
	const showResources = useAppSelector(selectShowScenarioResources);
	const showClues = useAppSelector(selectShowScenarioClues);

	const noContent = !(showDoom || showResources || showClues);

	if (noContent) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				{showDoom && <ScenarioDoom visible />}
				{showResources && <ScenarioResources visible />}
				{showClues && <ScenarioClues visible />}
			</C.Content>
		</C.Container>
	);
};
