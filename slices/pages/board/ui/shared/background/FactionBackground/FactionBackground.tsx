import type { PropsWithLayout } from "@pages/board/model";
import { selectCurrentFaction, useAppSelector } from "@shared/lib";
import type { Box } from "@shared/model";
import type { ImageProps } from "react-native";
import * as C from "./FactionBackground.components";
import { images } from "./images";

export type FactionBackgroundProps = ImageProps &
	PropsWithLayout & {
		view: Box;
	};

export const FactionBackground = ({
	view,
	...props
}: FactionBackgroundProps) => {
	const faction = useAppSelector(selectCurrentFaction);

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
