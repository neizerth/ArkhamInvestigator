import {
	selectCurrentHorror,
	selectCurrentStatBaseValue,
	selectCurrentStatValue,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./HorrorOverlay.components";

export type HorrorOverlayProps = ViewProps;

export const HorrorOverlay = (props: HorrorOverlayProps) => {
	const horror = useAppSelector(selectCurrentHorror);
	const sanity = useAppSelector(selectCurrentStatValue("sanity"));
	const baseSanity = useAppSelector(selectCurrentStatBaseValue("sanity"));

	const percentage = (horror * 100) / baseSanity;

	return (
		<C.Container {...props}>
			{horror > 0 && (
				<>
					<C.AreaTop />
					<C.AreaBottom />
				</>
			)}
			{percentage > 20 && <C.Writing />}
			{percentage >= 30 && <C.RR1 />}
			{percentage >= 50 && <C.Scratches />}
			{percentage >= 60 && <C.Fog />}
			{percentage >= 75 && <C.Eye />}
			{sanity < 2 && <C.AlmostInsane />}
		</C.Container>
	);
};
