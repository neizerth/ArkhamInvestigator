import { useCallback } from "react";
import * as C from "./Dropdown.components";

import { useUICallback } from "@modules/core/ui/lib";
import type { ViewStyle } from "react-native";
import { Dropdown as BaseDropdown } from "react-native-element-dropdown";
import type { DropdownProps as BaseDropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { color } from "../../../config";
import { styles } from "./Dropdown.style";

export type DropdownProps<T> = Omit<
	BaseDropdownProps<DropdownItem<T>>,
	"labelField" | "valueField"
> & {
	contentContainerStyle?: ViewStyle;
	itemStyle?: ViewStyle;
};

export type DropdownItem<T> = {
	label: string;
	value: T;
};

export function Dropdown<T>({
	contentContainerStyle,
	itemStyle,
	style,
	itemTextStyle,
	onChange: onChangeProp,
	onFocus: onFocusProp,
	...props
}: DropdownProps<T>) {
	const renderItem = useCallback(
		(item: DropdownItem<T>) => {
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

	const onChange = useUICallback({
		payload: {
			source: "dropdown",
			type: "change",
		},
		callback: onChangeProp,
	});

	const onFocus = useUICallback({
		payload: {
			source: "dropdown",
			type: "focus",
		},
		callback: onFocusProp,
	});

	return (
		<C.Container style={contentContainerStyle}>
			<BaseDropdown
				renderItem={renderItem}
				{...props}
				style={[styles.dropdown, style]}
				containerStyle={[styles.container, props.containerStyle]}
				selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
				itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
				placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
				inputSearchStyle={[styles.inputSearchStyle, props.inputSearchStyle]}
				searchPlaceholderTextColor={color.dark10}
				activeColor={color.dark15}
				selectedTextProps={{
					allowFontScaling: false,
				}}
				labelField="label"
				valueField="value"
				maxHeight={300}
				onChange={onChange}
				onFocus={onFocus}
			/>
		</C.Container>
	);
}
