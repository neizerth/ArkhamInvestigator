import type { ValueProps } from "@shared/ui";
import { type FC, type PropsWithChildren, useMemo } from "react";
import type { ListRenderItem, ViewProps } from "react-native";
import { Picker, type PickerProps } from "../../../control/picker";

type WithPickerValueOptions = {
	Value: FC<ValueProps>;
	Background: FC<PropsWithChildren>;
	data?: number[];
};

export type WithPickerValueProps = Omit<
	PickerProps,
	"renderItem" | "value" | "data" | "children" | "style"
> &
	PropsWithChildren & {
		value: number;
		style?: ViewProps["style"];
		type?: "value" | "picker";
		data?: number[];
	};

const styles = {
	gap: 30,
	contentContainerStyle: {
		justifyContent: "center",
	},
	listStyle: {
		borderRadius: 30,
	},
};

export const withPickerValue = ({
	Background,
	Value,
	data: defaultData = [],
}: WithPickerValueOptions) => {
	const renderItem: ListRenderItem<number> = ({ item }) => {
		return <Value value={item} />;
	};
	const Component: FC<WithPickerValueProps> = ({
		type = "value",
		children,
		...props
	}) => {
		const data = useMemo(() => {
			return props.data || defaultData;
		}, [defaultData, props.data]);

		return (
			<Background>
				{type === "picker" && (
					<Picker {...styles} {...props} renderItem={renderItem} data={data} />
				)}
				{type === "value" && (
					<Value value={props.value} contentContainerStyle={props.style} />
				)}
				{children}
			</Background>
		);
	};

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithPickerValue(${displayName})`;

	return Component;
};
