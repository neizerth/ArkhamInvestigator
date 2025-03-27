import { useCallback } from "react";
import * as C from "./Select.components";

import { color } from "@shared/config";
import { Dropdown } from "react-native-element-dropdown";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { styles } from "./Select.style";

export type SelectProps<T> = Omit<
	DropdownProps<SelectItem<T>>,
	"labelField" | "valueField"
>;

export type SelectItem<T> = {
	label: string;
	value: T;
};

export function Select<T>({ style, ...props }: SelectProps<T>) {
	const renderItem = useCallback((item: SelectItem<T>) => {
		return (
			<C.Item style={[styles.item]}>
				<C.ItemText style={[styles.itemTextStyle]}>{item.label}</C.ItemText>
			</C.Item>
		);
	}, []);

	return (
		<C.Container style={style}>
			<Dropdown
				{...props}
				style={styles.dropdown}
				containerStyle={styles.container}
				selectedTextStyle={styles.selectedTextStyle}
				itemTextStyle={styles.itemTextStyle}
				placeholderStyle={styles.placeholderStyle}
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
