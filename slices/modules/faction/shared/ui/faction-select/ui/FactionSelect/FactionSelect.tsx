import type { FactionFilterType } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionSelect.components";

export type FactionSelectProps = ViewProps & {
	onChange?: (value: FactionFilterType) => void;
	vertical?: boolean;
	size: number;
	value?: FactionFilterType;
	filters: FactionFilterType[];
};

export const FactionSelect = ({
	value,
	onChange,
	filters,
	vertical = false,
	size,
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

	const contentProps = {
		vertical,
		size,
	};

	return (
		<C.Container {...props} {...contentProps}>
			<C.Content {...contentProps}>
				{filters.map((item, index) => (
					<C.Button
						key={item}
						testID={`faction-filter-${item}`}
						value={item}
						selected={value === item}
						onPress={onPress(item)}
						first={index === 0}
						last={index === filters.length - 1}
						{...contentProps}
					/>
				))}
			</C.Content>
		</C.Container>
	);
};
