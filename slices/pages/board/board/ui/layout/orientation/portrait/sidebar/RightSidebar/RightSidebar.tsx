import {
	selectBoardProp,
	selectShowAllySlots,
	selectShowClues,
	selectShowInvestigatorDoom,
	selectShowResources,
	selectTrackHandSize,
} from "@modules/board/base/shared/lib";
import { selectPickerSize } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
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
	const showClues = useAppSelector(selectShowClues);
	const showResources = useAppSelector(selectShowResources);
	const showAllySlots = useAppSelector(selectShowAllySlots);
	const pickerSize = useAppSelector(selectPickerSize);

	const showSideDoom = showDoom && !xs;
	const showMainDoom = showDoom && xs;

	const showMainGroup = showClues || showResources || showMainDoom;
	const showSideGroup = showSideDoom || showHandSize;

	const { light } = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "image",
		}),
	);

	const inline = showDoom || showHandSize;
	const compact = pickerSize === "small" || showHandSize;

	const groupProps = {
		compact,
	};

	return (
		<Sidebar {...props}>
			<C.Container {...groupProps}>
				{showSideGroup && (
					<C.SideGroup {...groupProps} inline={inline}>
						{showSideDoom && <C.Doom inline={showHandSize} />}
						{showHandSize && <HandSize />}
					</C.SideGroup>
				)}
				{showMainGroup && (
					<C.MainGroup {...groupProps} inline={inline}>
						{showAllySlots && <C.Allies />}
						{showClues && <C.Clues light={light} />}
						{showResources && <C.Resources />}
						{showMainDoom && <C.Doom />}
					</C.MainGroup>
				)}
			</C.Container>
		</Sidebar>
	);
};
