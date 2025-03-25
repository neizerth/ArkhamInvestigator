import { useCallback } from "react";
import * as C from "./Select.components";

import { styles } from "./Select.style";
import { color } from "@shared/config";
import type { ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export type SelectProps<T> = Omit<DropdownProps<SelectItem<T>>, 'labelField' | 'valueField' | 'onChange'>

export type SelectItem<T> = {
	label: string;
	value: T;
}

export function Select<T>({
	...props
}: SelectProps<T>){

	const renderItem = useCallback((item: SelectItem<T>) => {
		return (
			<C.Item style={[styles.item]}>
				<C.ItemText style={[styles.itemTextStyle]}>{item.label}</C.ItemText>
			</C.Item>
		);
	}, []);
	
	return (
		<Dropdown
			{...props}
			style={styles.dropdown}
			containerStyle={styles.container}
			selectedTextStyle={styles.selectedTextStyle}
			itemTextStyle={styles.itemTextStyle}
			activeColor={color.dark15}
			selectedTextProps={{
				allowFontScaling: false,
			}}
			labelField="label"
			valueField="value"
			renderItem={renderItem}
			maxHeight={300}
		/>
	);
};
