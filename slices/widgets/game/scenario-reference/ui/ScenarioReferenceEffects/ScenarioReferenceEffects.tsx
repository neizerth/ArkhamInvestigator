import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceEffects.components";
import { useTokenReference } from "./useTokenReference";

export type ScenarioReferenceEffectsProps = ViewProps;

export const ScenarioReferenceEffects = (
	props: ScenarioReferenceEffectsProps,
) => {
	const reference = useTokenReference();

	return (
		<C.Container {...props}>
			{reference.map((item) => (
				<C.TokenGroup key={item.token}>
					<C.Token type={item.token} />
					<C.TokenEffect value={item.effect} />
				</C.TokenGroup>
			))}
		</C.Container>
	);
};
