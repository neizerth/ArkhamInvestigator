import type { ViewProps } from "react-native";
import {
	Doom,
	ScenarioClues,
	ScenarioResources,
} from "../../../../../../shared";
import * as C from "./SecondaryControls.components";

export type SecondaryControlsProps = ViewProps;

export const SecondaryControls = (props: SecondaryControlsProps) => {
	return (
		<C.Container {...props}>
			<C.Content>
				<ScenarioClues />
				<ScenarioResources />
				<Doom />
			</C.Content>
		</C.Container>
	);
};
