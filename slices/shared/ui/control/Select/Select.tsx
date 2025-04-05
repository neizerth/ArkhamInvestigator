import { useCallback } from "react";
import * as C from "./Select.components";

import { color } from "@shared/config";
import type { ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { styles } from "./Select.style";

export type SelectProps<T> = Omit<
	DropdownProps<SelectItem<T>>,
	"labelField" | "valueField"
> & {
	contentContainerStyle?: ViewStyle;
	itemStyle?: ViewStyle;
};

export type SelectItem<T> = {
	label: string;
	value: T;
};

export function Select<T>({
	contentContainerStyle,
	itemStyle,
	style,
	itemTextStyle,
	...props
}: SelectProps<T>) {
	const renderItem = useCallback(
		(item: SelectItem<T>) => {
			return (
				<C.Item style={[styles.item, itemStyle]}>
					<C.ItemText style={[styles.itemTextStyle, itemTextStyle]}>
						{item.label}
					</C.ItemText>
				</C.Item>
			);
		},
		[itemStyle, itemTextStyle],
	);

	return (
		<C.Container style={contentContainerStyle}>
			<Dropdown
				{...props}
				style={[styles.dropdown, style]}
				containerStyle={[styles.container, props.containerStyle]}
				selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
				itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
				placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
				activeColor={color.dark15}
				selectedTextProps={{
					allowFontScaling: false,
				}}
				labelField="label"
				valueField="value"
				renderItem={renderItem}
				maxHeight={300}
			/>
		</C.Container>
	);
}
