import type { ViewProps } from "react-native";
import * as C from "./PortraitLayout.components";

export type PortraitLayoutProps = ViewProps;

export const PortraitLayout = (props: PortraitLayoutProps) => {
	return (
		<C.Container {...props}>
			<C.Header />
			<C.SkillChecks />
			<C.Main>
				<C.LeftSidebar />
				<C.Area />
				<C.RightSidebar />
			</C.Main>
			<C.Footer />
			<C.Description />
			<C.Overlay />
		</C.Container>
	);
};
