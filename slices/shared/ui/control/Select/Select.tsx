import type { ViewStyle } from "react-native";
import type { DropdownItem, DropdownProps } from "../Dropdown";
import * as C from "./Select.components";

export type SelectItem<T> = DropdownItem<T> & {
	hint?: string;
};

export type SelectProps<T> = Omit<DropdownProps<T>, "data" | "value"> & {
	value?: T | null;
	data: SelectItem<T>[];
	contentContainerStyle?: ViewStyle;
	label?: string;
};

export function Select<T>({
	data,
	label = "",
	value,
	contentContainerStyle,
	...props
}: SelectProps<T>) {
	const item = data.find((item) => item.value === value);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Group>
				<C.Label>{label}</C.Label>
				<C.Select {...props} data={data} value={item} />
			</C.Group>
			{item?.hint && <C.Hint>{item.hint}</C.Hint>}
		</C.Container>
	);
}
