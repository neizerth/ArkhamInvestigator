import {
	Pressable as BasePressable,
	type PressableProps as BasePressableProps,
} from "react-native";
import type { PressProps } from "../../../model";
import { usePress } from "../../../shared/lib";

export type PressableProps = BasePressableProps & PressProps;

export const Pressable = (props: PressableProps) => {
	const pressProps = usePress(props);
	return <BasePressable {...props} {...pressProps} />;
};
