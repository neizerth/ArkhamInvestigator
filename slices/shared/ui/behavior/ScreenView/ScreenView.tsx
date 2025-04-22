import type { ScrollViewProps as BaseProps, ViewStyle } from "react-native";
import * as C from "./ScreenView.components";

export type ScreenViewProps = BaseProps & {
	contentStyleProps?: ViewStyle;
};

export const ScreenView = ({
	children,
	contentStyleProps,
	...props
}: ScreenViewProps) => {
	return (
		<C.Container {...props}>
			<C.Content style={contentStyleProps}>{children}</C.Content>
		</C.Container>
	);
};
