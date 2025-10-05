import { factionFilterTypes } from "@modules/faction/shared/config";
import type { FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType) => void;
	value?: FactionFilterType;
};

export const FactionSelect = ({
	value,
	onChange,
	...props
}: FactionSelectProps) => {
	const onPress = useCallback(
		(item: FactionFilterType) => () => {
			if (!onChange) {
				return false;
			}
			if (item === value) {
				return false;
			}
			onChange(item);
		},
		[value, onChange],
	);

	return (
		<C.Container {...props}>
			<C.Content>
				{factionFilterTypes.map((item, index) => (
					<C.Button
						key={item}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === item.length - 1}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
