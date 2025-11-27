import type { GameTextProps } from "@modules/core/theme/shared/ui";
import * as C from "./ScenarioReferenceEffectText.components";
import { getScenarioEffectsStyle } from "./ScenarioReferenceEffectText.style";

export type ScenarioReferenceEffectTextProps = GameTextProps & {
	language: string;
	small?: boolean;
	align?: "left" | "right";
};

export const ScenarioReferenceEffectText = ({
	language,
	small = false,
	align = "left",
	...props
}: ScenarioReferenceEffectTextProps) => {
	const effectProps = getScenarioEffectsStyle({
		language,
		small,
		align,
	});
	return (
		<C.Text
			{...props}
			{...effectProps}
			style={[props.style, effectProps.style]}
		/>
	);
};
