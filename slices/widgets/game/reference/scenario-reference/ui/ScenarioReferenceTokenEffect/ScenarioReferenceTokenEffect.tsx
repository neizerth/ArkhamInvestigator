import {
	getReferencePartTokens,
	selectReferenceCardChaosTokenOptions,
} from "@modules/chaos-bag/effect/entities/lib";
import { getTokenOptionLabel } from "@modules/chaos-bag/value/entities/lib";
import { getActiveOpacity, useAppSelector } from "@shared/lib";
import type { ReferencePart } from "arkham-investigator-data";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ScenarioReferenceTokenEffect.components";

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
	const options = useAppSelector(selectReferenceCardChaosTokenOptions(type));
	const showExpand = options.length > 0;

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
						<C.Text language={language} small={small} value={item.effect} />
					</C.EffectContent>
					{showExpand && (
						<C.Expand open={open}>
							<C.ExpandIcon icon="expand_more" />
						</C.Expand>
					)}
				</C.Effect>
			</C.Content>
			{open && (
				<C.Options>
					{options.map((option) => (
						<C.Option key={option.prompt} option={option}>
							<C.Text
								language={language}
								small={small}
								value={getTokenOptionLabel(option)}
							/>
						</C.Option>
					))}
				</C.Options>
			)}
		</C.Container>
	);
};
