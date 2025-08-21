import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ImageProps } from "react-native";
import * as C from "./FactionBackground.components";

export type FactionBackgroundProps = ImageProps;

export const FactionBackground = (props: FactionBackgroundProps) => {
	const faction = useAppSelector(selectCurrentFaction);

	return <C.Background {...props} faction={faction} />;
};
