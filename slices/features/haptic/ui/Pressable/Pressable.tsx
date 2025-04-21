import {
	Pressable as BasePressable,
	type PressableProps as BasePressableProps,
} from "react-native";
import { usePress } from "../../lib";
import type { PressProps } from "../../model";

export type PressableProps = BasePressableProps & PressProps;

export const Pressable = (props: PressableProps) => {
	const pressProps = usePress(props);
	return <BasePressable {...props} {...pressProps} />;
};
