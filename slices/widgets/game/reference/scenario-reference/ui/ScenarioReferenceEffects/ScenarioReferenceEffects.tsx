import { selectReferenceCard } from "@modules/stories/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceEffects.components";
import { getScenarioEffectsStyle } from "./ScenarioReferenceEffects.style";
import { useTokenReference } from "./useTokenReference";

export type ScenarioReferenceEffectsProps = ViewProps;

export const ScenarioReferenceEffects = (
	props: ScenarioReferenceEffectsProps,
) => {
	const card = useAppSelector(selectReferenceCard);
	const [reference, small] = useTokenReference();

	if (!card) {
		return;
	}

	const effectProps = getScenarioEffectsStyle({
		language: card.locale,
		small,
	});

	return (
		<C.Container {...props}>
			{reference.map((item) => (
				<C.Item key={item.id}>
					{item.type === "single" && <C.Token type={item.token} dark />}
					{item.type === "group" && (
						<C.TokenGroup>
							{item.tokens.map((token) => (
								<C.Token key={token} type={token} dark />
							))}
						</C.TokenGroup>
					)}
					<C.TokenEffect {...effectProps} value={item.effect} />
				</C.Item>
			))}
		</C.Container>
	);
};
