import type { ViewProps } from "react-native";
import { useNavigationMode } from "react-native-navigation-mode";
import { Navbar } from "../Navbar";
import * as C from "./PortraitLayout.components";

export type PortraitLayoutProps = ViewProps;

export const PortraitLayout = (props: PortraitLayoutProps) => {
	const { navigationMode } = useNavigationMode();
	const { navigationBarHeight } = navigationMode || {};
	const isNavbarVisible = Boolean(
		navigationBarHeight && navigationBarHeight > 0,
	);

	return (
		<C.Container {...props}>
			<C.Header />
			<C.SkillChecks />
			<C.Main>
				<C.LeftSidebar />
				<C.Area swipe />
				<C.RightSidebar />
			</C.Main>
			<C.Footer />
			<C.Description />
			<C.Overlay />
			{isNavbarVisible && <Navbar />}
		</C.Container>
	);
};
