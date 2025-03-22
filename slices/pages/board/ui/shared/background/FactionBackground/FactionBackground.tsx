import type { PropsWithLayout } from "@pages/board/model";
import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import type { Box, Faction } from "@shared/model";
import type { ImageProps } from "react-native";
import * as C from "./FactionBackground.components";
import { images } from "./images";
import { useFaction } from "@pages/board/lib";

export type FactionBackgroundProps = ImageProps &
	PropsWithLayout & {
		view: Box;
	};

export const FactionBackground = ({
	view,
	...props
}: FactionBackgroundProps) => {
	const { investigator } = useAppSelector(selectCurrentBoard);
	const { faction } = useFaction()

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
