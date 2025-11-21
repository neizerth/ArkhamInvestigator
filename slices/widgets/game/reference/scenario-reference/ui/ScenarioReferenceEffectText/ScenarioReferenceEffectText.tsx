import type { GameTextProps } from "@modules/core/theme/shared/ui";
import * as C from "./ScenarioReferenceEffectText.components";
import { getScenarioEffectsStyle } from "./ScenarioReferenceEffectText.style";

export type ScenarioReferenceEffectTextProps = GameTextProps & {
	language: string;
	small?: boolean;
};

export const ScenarioReferenceEffectText = ({
	language,
	small = false,
	...props
}: ScenarioReferenceEffectTextProps) => {
	const effectProps = getScenarioEffectsStyle({
		language,
		small,
	});
	return <C.Text {...props} {...effectProps} />;
};
