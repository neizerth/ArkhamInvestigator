import { LayoutContext } from "@pages/board/config";
import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardHeader.components";

export type BoardHeaderProps = ViewProps;

export const BoardHeader = (props: BoardHeaderProps) => {
	const { layout } = useContext(LayoutContext);
	const board = useAppSelector(selectCurrentBoard);

	const gap = layout.type === "column" ? layout.gap : 0;
	const marginLeft = layout.type === "row" ? -layout.gap : 0;

	const style = {
		flexDirection: layout.type,
		gap,
	};

	const skillsStyle = {
		marginLeft,
	};

	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Title board={board} />
			<C.Skills style={skillsStyle} />
		</C.Container>
	);
};
