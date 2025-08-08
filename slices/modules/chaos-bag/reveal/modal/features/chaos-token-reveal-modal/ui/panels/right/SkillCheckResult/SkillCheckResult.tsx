import type { ViewProps } from "react-native";
import * as C from "./SkillCheckResult.components";

export type SkillCheckResultProps = ViewProps;

export const SkillCheckResult = (props: SkillCheckResultProps) => {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.CompareSymbol>=</C.CompareSymbol>
				<C.Result />
			</C.Content>
		</C.Container>
	);
};
