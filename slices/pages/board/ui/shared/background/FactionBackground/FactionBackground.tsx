import { useFaction } from "@pages/board/lib";
import type { PropsWithBoard, PropsWithLayout } from "@pages/board/model";
import type { Box, Faction } from "@shared/model";
import type { ImageProps } from "react-native";
import * as C from "./FactionBackground.components";
import { images } from "./images";

export type FactionBackgroundProps = ImageProps &
	PropsWithBoard &
	PropsWithLayout & {
		view: Box;
	};

export const FactionBackground = ({
	view,
	board,
	...props
}: FactionBackgroundProps) => {
	const { faction } = useFaction(board);

	const background = images[faction];

	return (
		<C.Background
			{...props}
			source={background}
			width={view.width}
			height={view.height}
		/>
	);
};
