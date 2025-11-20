import { getReferencePartTokens } from "@modules/chaos-bag/effect/entities/lib";
import { selectChaosTokenOptions } from "@modules/chaos-bag/value/entities/lib";
import { getActiveOpacity, useAppSelector } from "@shared/lib";
import type { ReferencePart } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceTokenEffect.components";
import { getScenarioEffectsStyle } from "./ScenarioReferenceTokenEffect.style";

export type ScenarioReferenceTokenEffectProps = ViewProps & {
	item: ReferencePart;
	language: string;
	small?: boolean;
	onPress?: () => void;
	open?: boolean;
};

export const ScenarioReferenceTokenEffect = ({
	item,
	language,
	onPress,

	small = false,
	open = false,
	...props
}: ScenarioReferenceTokenEffectProps) => {
	const [type] = getReferencePartTokens(item);
	const options = useAppSelector(selectChaosTokenOptions(type));
	const showExpand = options.length > 0;

	const effectProps = getScenarioEffectsStyle({
		language,
		small,
	});

	const activeOpacity = getActiveOpacity(showExpand);

	const handlePress = useCallback(() => {
		if (!showExpand) {
			return false;
		}
		onPress?.();
	}, [onPress, showExpand]);

	return (
		<C.Container {...props}>
			<C.Content>
				{item.type === "single" && <C.Token type={item.token} dark />}
				{item.type === "group" && (
					<C.TokenGroup>
						{item.tokens.map((token) => (
							<C.Token key={token} type={token} dark />
						))}
					</C.TokenGroup>
				)}
				<C.Effect activeOpacity={activeOpacity} onPress={handlePress}>
					<C.EffectContent>
						<C.EffectText {...effectProps} value={item.effect} />
					</C.EffectContent>
					{showExpand && (
						<C.Expand open={open}>
							<C.ExpandIcon icon="expand_more" />
						</C.Expand>
					)}
				</C.Effect>
			</C.Content>
		</C.Container>
	);
};
