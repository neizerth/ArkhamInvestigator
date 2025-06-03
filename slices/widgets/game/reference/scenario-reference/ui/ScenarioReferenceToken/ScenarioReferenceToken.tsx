import {
	type ChaosTokenProps,
	selectModifyScenarioChaosTokens,
	selectScenarioChaosTokenValueByType,
	setScenarioChaosTokenValueByType,
} from "@features/game/chaos-bag";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { range } from "ramda";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import type {
	PickerChangeEvent,
	PickerListRenderItem,
} from "../../../../../control/picker";
import * as C from "./ScenarioReferenceToken.components";
export type ScenarioReferenceTokenProps = ChaosTokenProps & {
	contentContainerStyle?: ViewProps["style"];
};

const data = range(-20, 21);

export const ScenarioReferenceToken = ({
	contentContainerStyle,
	...props
}: ScenarioReferenceTokenProps) => {
	const dispatch = useAppDispatch();
	const { type } = props;
	const editable = useAppSelector(selectModifyScenarioChaosTokens);
	const value = useAppSelector(selectScenarioChaosTokenValueByType(type));

	const setValue = useCallback(
		({ value = 0 }: PickerChangeEvent) => {
			dispatch(
				setScenarioChaosTokenValueByType({
					type,
					value,
				}),
			);
		},
		[dispatch, type],
	);

	const renderItem: PickerListRenderItem = useCallback(
		({ item }) => {
			return <C.TokenValue value={item} type={type} />;
		},
		[type],
	);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Token {...props} />
			{editable && (
				<C.ControlContainer>
					<C.Control
						data={data}
						renderItem={renderItem}
						value={value}
						onValueChanged={setValue}
					/>
				</C.ControlContainer>
			)}
		</C.Container>
	);
};
