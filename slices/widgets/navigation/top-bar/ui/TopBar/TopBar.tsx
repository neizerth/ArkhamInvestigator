import type { ViewProps } from "react-native";
import * as C from "./TopBar.components";

export type TopBarProps = ViewProps & {
	onBack?: () => void;
	title?: string;
};

export const TopBar = ({ onBack, title, children, ...props }: TopBarProps) => {
	return (
		<C.Container {...props}>
			{onBack ? (
				<C.Back icon="arrow_back" onPress={onBack} />
			) : (
				<C.Placeholder />
			)}
			{title && <C.Title>{title}</C.Title>}
			{children ? children : <C.Placeholder />}
		</C.Container>
	);
};
