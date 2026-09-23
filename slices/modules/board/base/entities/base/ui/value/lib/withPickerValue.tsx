import type { PickerProps } from "@modules/core/control/entities/picker/model";
import { Picker } from "@modules/core/control/entities/picker/ui";
import type { ValueProps } from "@shared/ui";
import { type FC, type PropsWithChildren, useMemo } from "react";
import type { ListRenderItem, ViewProps } from "react-native";

type WithPickerValueOptions = {
	Value: FC<ValueProps>;
	Background: FC<PropsWithChildren>;
	data?: number[];
};

export type WithPickerValueProps = Omit<
	PickerProps<number>,
	"renderItem" | "value" | "data" | "children" | "style"
> &
	PropsWithChildren & {
		value: number;
		style?: ViewProps["style"];
		type?: "value" | "picker";
		data?: number[];
	};

export type PickerValueProps = WithPickerValueProps & {
	Value: FC<ValueProps>;
	defaultData?: number[];
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

/** the stat number itself: a scrollable picker or a plain value, without any background */
export const PickerValue = ({
	Value,
	defaultData = [],
	type = "value",
	children,
	...props
}: PickerValueProps) => {
	const renderItem: ListRenderItem<number> = ({ item }) => {
		return <Value value={item} />;
	};

	const data = useMemo(() => {
		return props.data || defaultData;
	}, [defaultData, props.data]);

	return (
		<>
			{type === "picker" && (
				<Picker {...styles} {...props} renderItem={renderItem} data={data} />
			)}
			{type === "value" && (
				<Value value={props.value} contentContainerStyle={props.style} />
			)}
			{children}
		</>
	);
};

export const withPickerValue = ({
	Background,
	Value,
	data: defaultData = [],
}: WithPickerValueOptions) => {
	const Component: FC<WithPickerValueProps> = (props) => (
		<Background>
			<PickerValue {...props} Value={Value} defaultData={defaultData} />
		</Background>
	);

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithPickerValue(${displayName})`;

	return Component;
};
