import {
	selectShowInvestigatorDoom,
	selectTrackHandSize,
	useAppSelector,
} from "@shared/lib";
import { Dimensions, type ViewProps } from "react-native";
import { HandSize } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./RightSidebar.components";

const screen = Dimensions.get("screen");

const xs = screen.height <= 640;

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const showHandSize = useAppSelector(selectTrackHandSize);
	const showDoom = useAppSelector(selectShowInvestigatorDoom);

	const inline = showDoom || showHandSize;

	const sideProps = {
		compact: showHandSize,
	};

	return (
		<Sidebar {...props}>
			<C.Container {...sideProps}>
				<C.SideGroup {...sideProps} inline={inline}>
					{showDoom && !xs && <C.Doom inline={showHandSize} />}
					{showHandSize && <HandSize />}
				</C.SideGroup>
				<C.MainGroup {...sideProps} inline={inline}>
					<C.Clues />
					<C.Resources />
					{showDoom && xs && <C.Doom />}
				</C.MainGroup>
			</C.Container>
		</Sidebar>
	);
};
