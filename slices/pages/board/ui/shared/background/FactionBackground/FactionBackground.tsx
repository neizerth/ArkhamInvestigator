import { factionBackgroundImages } from "@assets/images/game/faction/background";
import { selectCurrentFaction, useAppSelector } from "@shared/lib";
import type { Box } from "@shared/model";
import type { FastImageProps } from "react-native-fast-image";
import type { PropsWithLayout } from "../../../../model";
import * as C from "./FactionBackground.components";

export type FactionBackgroundProps = FastImageProps &
	PropsWithLayout & {
		view: Box;
	};

export const FactionBackground = ({
	view,
	...props
}: FactionBackgroundProps) => {
	const faction = useAppSelector(selectCurrentFaction);

	const background = factionBackgroundImages[faction];

	return (
		<C.Background
			{...props}
			source={background}
			width={view.width}
			height={view.height}
		/>
	);
};
