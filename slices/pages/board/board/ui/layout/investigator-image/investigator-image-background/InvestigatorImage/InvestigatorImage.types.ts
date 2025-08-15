import type { BoxLayout } from "@shared/model";
import type { ImageProps } from "expo-image";
import type { ViewStyle } from "react-native";

export type InvestigatorImageProps = Omit<ImageProps, "source"> & {
	layout: BoxLayout;
	contentContainerStyle?: ViewStyle;
	code: string;
	version?: number;
};
