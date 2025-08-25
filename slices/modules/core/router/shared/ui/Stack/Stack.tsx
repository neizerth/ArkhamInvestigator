import { useAppSelector } from "@shared/lib";
import { Stack as BaseStack } from "expo-router";
import { type ComponentProps, useMemo } from "react";
import { selectEnableNavigationAnimation } from "../../lib";

export type StackProps = ComponentProps<typeof BaseStack>;

export const Stack = (props: StackProps) => {
	const enabled = useAppSelector(selectEnableNavigationAnimation);
	const screenOptions = useMemo<StackProps["screenOptions"]>(() => {
		const baseOptions = props.screenOptions ?? {};

		return {
			...baseOptions,
			animation: enabled ? "default" : "none",
		};
	}, [enabled, props.screenOptions]);
	return <BaseStack {...props} screenOptions={screenOptions} />;
};

Stack.Screen = BaseStack.Screen;
