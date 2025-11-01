import type { FactionBackgroundProps as BackgroundProps } from "@modules/faction/shared/ui";
import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./FactionBackground.components";

export type FactionBackgroundProps = Omit<BackgroundProps, "faction">;

export const FactionBackground = (props: FactionBackgroundProps) => {
	const faction = useAppSelector(selectCurrentFaction);

	return <C.Background {...props} faction={faction} />;
};
