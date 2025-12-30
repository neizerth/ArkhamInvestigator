import {
	selectReferenceCardChaosTokenOptions,
	selectReferenceCardEffects,
} from "@modules/chaos-bag/effect/entities/lib";
import { getTokenOptionLabel } from "@modules/chaos-bag/value/entities/lib";
import { getActiveOpacity, useAppSelector } from "@shared/lib";
import type { Defined } from "@shared/model";
import { useCallback, useState } from "react";
import type { ViewProps } from "react-native";
import { useCurrentToken } from "../../lib";
import * as C from "./DescriptionPanel.components";

export type DescriptionPanelProps = ViewProps;

export const DescriptionPanel = (props: DescriptionPanelProps) => {
	const restProps = useCurrentToken();
	const { effect, currentToken } = restProps;

	if (!effect || !currentToken) {
		return null;
	}

	return (
		<Container
			{...props}
			{...restProps}
			effect={effect}
			currentToken={currentToken}
		/>
	);
};

type TokenProps = ReturnType<typeof useCurrentToken>;

type ContainerProps = ViewProps &
	Omit<TokenProps, "effect" | "currentToken"> & {
		effect: string;
		currentToken: Defined<TokenProps["currentToken"]>;
	};

const Container = ({
	isLast,
	onPress: onPressProp,
	currentToken,
	...props
}: ContainerProps) => {
	const { type } = currentToken;

	const [open, setOpen] = useState(false);

	const options = useAppSelector(selectReferenceCardChaosTokenOptions(type));
	const referenceEffects = useAppSelector(selectReferenceCardEffects);
	const defaultEffect = referenceEffects[type] ?? "";

	const effect = open ? defaultEffect : props.effect;
	const showExpand = options.length > 0;

	const activeOpacity = getActiveOpacity(showExpand, 0.7);

	const onPress = useCallback(() => {
		if (!showExpand) {
			onPressProp();
			return false;
		}
		setOpen((prev) => !prev);
	}, [onPressProp, showExpand]);

	return (
		<C.Container {...props} last={isLast}>
			<C.Content onPress={onPress} activeOpacity={activeOpacity}>
				<C.Effect value={effect} />
				{showExpand && (
					<C.Expand open={open}>
						<C.ExpandIcon icon="expand_more" />
					</C.Expand>
				)}
			</C.Content>
			{open && (
				<C.Options>
					{options.map((option, index) => (
						<C.Option key={option.prompt} type={type} index={index}>
							<C.Effect value={getTokenOptionLabel(option)} />
						</C.Option>
					))}
				</C.Options>
			)}
		</C.Container>
	);
};
