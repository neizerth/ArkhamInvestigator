import {
	selectShowDoom,
	selectShowScenarioClues,
	selectShowScenarioResources,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import {
	ScenarioClues,
	ScenarioDoom,
	ScenarioResources,
} from "../../../../../../../shared";
import * as C from "./SecondaryControls.components";

export type SecondaryControlsProps = ViewProps;

export const SecondaryControls = (props: SecondaryControlsProps) => {
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
