import { selectCurrentLanguage } from "@features/i18n";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceEffects.components";
import { getScenarioEffectsStyle } from "./ScenarioReferenceEffects.style";
import { useTokenReference } from "./useTokenReference";

export type ScenarioReferenceEffectsProps = ViewProps;

export const ScenarioReferenceEffects = (
	props: ScenarioReferenceEffectsProps,
) => {
	const language = useAppSelector(selectCurrentLanguage);
	const [reference, small] = useTokenReference();

	const effectProps = getScenarioEffectsStyle({
		language,
		small,
	});

	return (
		<C.Container {...props}>
			{reference.map((item) => (
				<C.TokenGroup key={item.token}>
					<C.Token type={item.token} dark />
					<C.TokenEffect {...effectProps} value={item.effect} />
				</C.TokenGroup>
			))}
		</C.Container>
	);
};
