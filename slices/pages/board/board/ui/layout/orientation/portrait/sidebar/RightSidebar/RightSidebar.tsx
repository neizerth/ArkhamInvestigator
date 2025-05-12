import {
	selectShowInvestigatorDoom,
	selectTrackHandSize,
	useAppSelector,
} from "@shared/lib";
import { useContext } from "react";
import { Dimensions, type ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { HandSize, InvestigatorDoom } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./RightSidebar.components";

const screen = Dimensions.get("screen");

const xs = screen.height <= 640;

export type RightSidebarProps = ViewProps;
export const RightSidebar = ({ ...props }: RightSidebarProps) => {
	const { height } = useContext(PortraitLayoutContext);
	const showHandSize = useAppSelector(selectTrackHandSize);
	const showDoom = useAppSelector(selectShowInvestigatorDoom);

	const inline = showDoom && showHandSize;

	const sideProps = {
		unit: height,
		compact: showHandSize,
	};

	return (
		<Sidebar {...props}>
			<C.Container {...sideProps}>
				{showHandSize && <HandSize />}
				{showDoom && !xs && <InvestigatorDoom />}
				<C.SideStatGroup {...props} {...sideProps} inline={inline}>
					<C.Clues />
					<C.Resources />
					{showDoom && xs && <InvestigatorDoom />}
				</C.SideStatGroup>
			</C.Container>
		</Sidebar>
	);
};
