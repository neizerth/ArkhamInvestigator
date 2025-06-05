import {
	type ChaosTokenProps,
	selectModifyChaosTokens,
} from "@features/game/chaos-bag";
import { useAppSelector } from "@shared/lib";

import type { ViewProps } from "react-native";

import * as C from "./ScenarioReferenceToken.components";
export type ScenarioReferenceTokenProps = ChaosTokenProps & {
	contentContainerStyle?: ViewProps["style"];
};

export const ScenarioReferenceToken = ({
	contentContainerStyle,
	...props
}: ScenarioReferenceTokenProps) => {
	const { type } = props;
	const editable = useAppSelector(selectModifyChaosTokens);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Token {...props} />
			{editable && (
				<C.ControlContainer>
					<C.Control type={type} />
				</C.ControlContainer>
			)}
		</C.Container>
	);
};
