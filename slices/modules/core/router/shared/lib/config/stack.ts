import type { Stack } from "expo-router";
import type { FC } from "react";

type StackProps = typeof Stack extends FC<infer Props> ? Props : never;
type ScreenOptions = StackProps["screenOptions"];

export const stackScreenOptions: ScreenOptions = {
	headerShown: false,
	contentStyle: {
		backgroundColor: "transparent",
	},
};

export const asTransparentModal = {
	presentation: "transparentModal" as const,
};

export const modalStackScreenOptions: ScreenOptions = {
	...stackScreenOptions,
	...asTransparentModal,
};
