import type { StyleProp, TextStyle, ViewProps } from "react-native";
import * as C from "./TopBar.components";

export type TopBarProps = ViewProps & {
	onBack?: () => void;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
};

export const TopBar = ({
	onBack,
	title,
	titleStyle,
	children,
	...props
}: TopBarProps) => {
	return (
		<C.Container {...props}>
			{onBack ? (
				<C.Back icon="arrow_back" onPress={onBack} />
			) : (
				<C.Placeholder />
			)}
			{title && <C.Title style={titleStyle}>{title}</C.Title>}
			{children ? children : <C.Placeholder />}
		</C.Container>
	);
};
