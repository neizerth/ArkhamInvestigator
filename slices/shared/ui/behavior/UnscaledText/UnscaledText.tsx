import { Text, type TextProps } from "react-native";

export type UnscaledTextProps = Omit<TextProps, "allowFontScaling">;

export const UnscaledText = (props: UnscaledTextProps) => {
	return <Text {...props} allowFontScaling={false} />;
};
