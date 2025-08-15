import type { Stack } from "expo-router";
import type { FC } from "react";

type StackProps = typeof Stack extends FC<infer Props> ? Props : never;

export const stackScreenOptions: StackProps["screenOptions"] = {
	headerShown: false,
	contentStyle: {
		backgroundColor: "transparent",
	},
};

export const modalStackScreenOptions: StackProps["screenOptions"] = {
	headerShown: false,
	contentStyle: {
		backgroundColor: "transparent",
	},
	presentation: "transparentModal",
};

export const asTransparentModal = {
	presentation: "transparentModal" as const,
};
