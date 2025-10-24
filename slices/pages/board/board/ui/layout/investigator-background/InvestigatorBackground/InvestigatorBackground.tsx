import {
	selectBoardProp,
	selectShowDamageAndHorrorEffects,
} from "@modules/board/base/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { selectBoardIsInactive } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackground.components";

export type InvestigatorBackgroundProps = ViewProps;

export const InvestigatorBackground = ({
	...props
}: InvestigatorBackgroundProps) => {
	const showEffects = useAppSelector(selectShowDamageAndHorrorEffects);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const background = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "background",
		}),
	);
	const active = useAppSelector(selectBoardIsInactive("current"));

	return (
		<C.Container {...props}>
			<C.Content>
				<C.FactionBackground enabled={artworksEnabled} />
				{artworksEnabled && background && (
					<C.Background
						source={{ uri: background.color }}
						grayscaleSource={{ uri: background.grayscale }}
						grayscale={active}
					/>
				)}
				{showEffects && (
					<>
						<C.Damage />
						<C.Horror />
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
