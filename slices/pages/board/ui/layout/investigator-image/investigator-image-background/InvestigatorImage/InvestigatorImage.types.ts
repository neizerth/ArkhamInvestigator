import type { BoxLayout } from "@shared/model";
import type { ImageProps, ViewStyle } from "react-native";

export type InvestigatorImageProps = Omit<ImageProps, "source"> & {
	layout: BoxLayout;
	contentContainerStyle?: ViewStyle;
	code: string;
};
