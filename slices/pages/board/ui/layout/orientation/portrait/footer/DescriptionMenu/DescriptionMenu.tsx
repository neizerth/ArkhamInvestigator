import {
	changeInvestigator,
	changeInvestigatorDetails,
	selectCurrentBoardProp,
	selectHaveDetails,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./DescriptionMenu.components";

export type DescriptionMenuProps = ViewProps;

export const DescriptionMenu = (props: DescriptionMenuProps) => {
	const dispatch = useAppDispatch();
	const signatureGroupId = useAppSelector(
		selectCurrentBoardProp("signatureGroupId"),
	);
	const haveDetails = useAppSelector(selectHaveDetails(signatureGroupId));

	const hide = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	const onDetailsChange = useCallback(() => {
		dispatch(changeInvestigatorDetails());
	}, [dispatch]);

	const onChangeInvestigator = useCallback(() => {
		dispatch(changeInvestigator());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Button icon="change-investigator" onPress={onChangeInvestigator} />
			{haveDetails && (
				<C.Button icon="investigator" onPress={onDetailsChange} />
			)}
			<C.Hide onPress={hide} />
		</C.Container>
	);
};
