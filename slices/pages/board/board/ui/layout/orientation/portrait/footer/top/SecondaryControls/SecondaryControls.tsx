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
} from "../../../../../../shared";
import * as C from "./SecondaryControls.components";

export type SecondaryControlsProps = ViewProps;

export const SecondaryControls = (props: SecondaryControlsProps) => {
	const showDoom = useAppSelector(selectShowDoom);
	const showResources = useAppSelector(selectShowScenarioResources);
	const showClues = useAppSelector(selectShowScenarioClues);

	return (
		<C.Container {...props}>
			<C.Content>
				{showDoom && <ScenarioDoom />}
				{showResources && <ScenarioResources />}
				{showClues && <ScenarioClues />}
			</C.Content>
		</C.Container>
	);
};
