import { PortraitLayoutContext } from "@pages/board/config";
import { routes } from "@shared/config";
import {
	goToPage,
	selectCurrentBoard,
	setCurrentInvestigatorDetails,
	setReplaceInvestigator,
	setSelectedInvestigators,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { IconProps, Row } from "@shared/ui";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./DescriptionMenu.components";

export type DescriptionMenuProps = ViewProps;

export const DescriptionMenu = (props: DescriptionMenuProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectCurrentBoard);

	const details = board?.details;
	const selection = board?.selection;
	const media = details?.media;

	const haveDetails = media?.variants || media?.skins;

	const hide = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	const changeInvestigatorDetails = useCallback(() => {
		if (!details || !selection) {
			return;
		}
		dispatch(goToPage(routes.selectInvestigatorDetails));
		dispatch(setCurrentInvestigatorDetails(details));
		dispatch(setSelectedInvestigators([selection]));
		dispatch(setShowDescription(false));
	}, [dispatch, details, selection]);

	const changeInvestigator = useCallback(() => {
		if (!selection) {
			return;
		}
		dispatch(setShowDescription(false));
		dispatch(setReplaceInvestigator(true));
		dispatch(setSelectedInvestigators([selection]));
		dispatch(goToPage(routes.selectInvestigators));
	}, [dispatch, selection]);

	return (
		<C.Container {...props}>
			<C.Button icon="change-investigator" onPress={changeInvestigator} />
			{haveDetails && (
				<C.Button
					icon="investigator"
					onPress={changeInvestigatorDetails}
				/>
			)}
			<C.Hide onPress={hide} />
		</C.Container>
	);
};
