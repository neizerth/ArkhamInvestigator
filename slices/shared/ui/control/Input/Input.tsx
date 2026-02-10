import type { Defined } from "@shared/model";
import { useCallback, useEffect, useState } from "react";
import type { TextInputProps, ViewStyle } from "react-native";
import * as C from "./Input.components";

export type InputProps = TextInputProps & {
	containerStyle?: ViewStyle;
	fixedPlaceholder?: boolean;
};

type OnChange = Defined<TextInputProps["onChange"]>;

export const Input = ({
	containerStyle,
	fixedPlaceholder,
	onChange: onChangeProp,
	...props
}: InputProps) => {
	const [value, setValue] = useState(props.value || props.defaultValue);

	const showFixedPlaceholder =
		fixedPlaceholder && props.placeholder && Boolean(value);

	const onChange: OnChange = useCallback(
		(e) => {
			onChangeProp?.(e);
			setValue(e.nativeEvent.text);
		},
		[onChangeProp],
	);

	useEffect(() => {
		setValue(props.value || props.defaultValue);
	}, [props.value, props.defaultValue]);

	return (
		<C.Container style={containerStyle}>
			{showFixedPlaceholder && (
				<C.FixedPlaceholder>{props.placeholder}</C.FixedPlaceholder>
			)}
			<C.Input allowFontScaling {...props} onChange={onChange} />
		</C.Container>
	);
};
