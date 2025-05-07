import type { ViewProps } from "react-native";
import * as C from "./FooterTopContent.components";

export type FooterTopContentProps = ViewProps;

export const FooterTopContent = (props: FooterTopContentProps) => {
	return (
		<C.Container {...props}>
			<C.Secondary />
			<C.TopMenu />
		</C.Container>
	);
};
