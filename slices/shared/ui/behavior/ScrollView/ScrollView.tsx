import type { ComponentProps } from "react";
import { Platform } from "react-native";
import { ScrollView as BaseScrollView } from "react-native-gesture-handler";

export type ScrollViewProps = ComponentProps<typeof BaseScrollView>;
const baseProps: Partial<ScrollViewProps> =
	Platform.OS === "android"
		? {
				nestedScrollEnabled: true,
				overScrollMode: "never",
			}
		: {};

export const ScrollView = (props: ScrollViewProps) => {
	return <BaseScrollView {...baseProps} {...props} />;
};
