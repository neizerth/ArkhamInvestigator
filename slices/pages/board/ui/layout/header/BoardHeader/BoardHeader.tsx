import { LayoutContext } from "@pages/board/config";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardHeader.components";
import { HeaderLayout, PropsWithBoard } from "@pages/board/model";

export type BoardHeaderProps = ViewProps & PropsWithBoard & {
	layout: HeaderLayout
}

export const BoardHeader = ({
	board,
	layout,
	...props
}: BoardHeaderProps) => {
	const gap = layout.type === "column" ? layout.gap : 0;
	const marginLeft = layout.type === "row" ? -layout.gap : 0;

	const style = {
		flexDirection: layout.type,
		gap,
	};

	const skillsStyle = {
		marginLeft,
	}

	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Title 
				board={board}
				layout={layout}
			/>
			<C.Skills 
				style={skillsStyle} 
				layout={layout}
				board={board}
			/>
		</C.Container>
	);
};
