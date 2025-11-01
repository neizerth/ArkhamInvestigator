import type { FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType) => void;
	value?: FactionFilterType;
	filters: FactionFilterType[];
};

export const FactionSelect = ({
	value,
	onChange,
	filters,
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
				{filters.map((item, index) => (
					<C.Button
						key={item}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === filters.length - 1}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
