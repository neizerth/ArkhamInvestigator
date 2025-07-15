import {
	changeInvestigator,
	changeInvestigatorDetails,
	delay,
	setShowDescription,
	useAppDispatch,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./DescriptionMenu.components";

export type DescriptionMenuProps = ViewProps;

export const DescriptionMenu = (props: DescriptionMenuProps) => {
	const dispatch = useAppDispatch();

	const hide = useCallback(async () => {
		dispatch(setShowDescription(false));

		await delay(350);
	}, [dispatch]);

	const onDetailsChange = useCallback(async () => {
		await hide();

		dispatch(changeInvestigatorDetails());
	}, [dispatch, hide]);

	const onChangeInvestigator = useCallback(async () => {
		await hide();
		dispatch(changeInvestigator());
	}, [dispatch, hide]);

	return (
		<C.Container {...props}>
			<C.ChangeInvestigator
				icon="change-investigator"
				onPress={onChangeInvestigator}
			/>
			<C.Button icon="investigator" onPress={onDetailsChange} />
			<C.Hide onPress={hide} />
		</C.Container>
	);
};
