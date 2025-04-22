import type { TextInputProps } from "react-native";
import * as C from "./Input.components";

export type InputProps = TextInputProps;

export const Input = (props: InputProps) => {
	return <C.Input allowFontScaling {...props} />;
};
