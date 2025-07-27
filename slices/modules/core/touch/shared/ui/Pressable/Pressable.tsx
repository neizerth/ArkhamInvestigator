import {
	Pressable as BasePressable,
	type PressableProps as BasePressableProps,
} from "react-native";
import { usePressProps } from "../../lib";
import type { PressProps } from "../../model";

export type PressableProps = BasePressableProps & PressProps;

export const Pressable = (props: PressableProps) => {
	const pressProps = usePressProps(props);
	return <BasePressable {...props} {...pressProps} />;
};
