import { LayoutContext } from "@pages/board/config";
import type { PropsWithBoard } from "@pages/board/model";
import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImage.components";
// import { useActiveStyle } from './useActiveStyle';

export type InvestigatorImageProps = ViewProps & PropsWithBoard;

export const InvestigatorImage = ({
	board,
	...props
}: InvestigatorImageProps) => {
	const { view, layout } = useContext(LayoutContext);

	return (
		<C.Container {...props} view={view}>
			<C.Content>
				<C.FactionBackground board={board} view={view} layout={layout} />
				{layout.type === "column" && <C.PortraitBackground />}
				{layout.type === "row" && <C.LandscapeBackground layout={layout} />}
			</C.Content>
		</C.Container>
	);
};
