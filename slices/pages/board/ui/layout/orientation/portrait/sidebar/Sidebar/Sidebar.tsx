import type { ViewProps } from "react-native";
import * as C from "./Sidebar.components";

export type SidebarProps = ViewProps;

export const Sidebar = ({ children, ...props }: SidebarProps) => {
	return (
		<C.Container {...props}>
			<C.Area />
			<C.Content>{children}</C.Content>
		</C.Container>
	);
};
