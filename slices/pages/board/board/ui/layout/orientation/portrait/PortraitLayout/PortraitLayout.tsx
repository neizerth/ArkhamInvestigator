import { isNavbarVisible } from "@shared/config";
import type { ViewProps } from "react-native";
import { Navbar } from "../Navbar";
import * as C from "./PortraitLayout.components";

export type PortraitLayoutProps = ViewProps;

export const PortraitLayout = (props: PortraitLayoutProps) => {
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
