import type { StyleProp, ViewStyle } from "react-native";

export type OnLoadEventPayload = {
	url: string;
};

export type GrayscaleModuleEvents = {
	onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
	value: string;
};

export type GrayscaleViewProps = {
	url: string;
	onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
	style?: StyleProp<ViewStyle>;
};

export type ToGrayscaleResult = {
	base64: string;
};
