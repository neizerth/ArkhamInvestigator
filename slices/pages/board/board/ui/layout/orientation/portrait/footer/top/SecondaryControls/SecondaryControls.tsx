import type { ViewProps } from "react-native";
import { Doom, ScenarioClues } from "../../../../../../shared";
import * as C from "./SecondaryControls.components";

export type SecondaryControlsProps = ViewProps;

export const SecondaryControls = (props: SecondaryControlsProps) => {
	return (
		<C.Container {...props}>
			<C.Content>
				<ScenarioClues />
				<Doom />
			</C.Content>
		</C.Container>
	);
};
