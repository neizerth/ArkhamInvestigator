import { setShowDescription } from "@modules/board/base/shared/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { changeSignatureDetails } from "@modules/signature/entities/lib/store/features/changeSignatureDetails/changeSignatureDetails";
import { routes } from "@shared/config";
import { delay, setReplaceInvestigator, useAppDispatch } from "@shared/lib";
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

		dispatch(changeSignatureDetails());
	}, [dispatch, hide]);

	const onChangeInvestigator = useCallback(async () => {
		await hide();
		dispatch(setReplaceInvestigator(true));

		await delay(150);

		dispatch(goToPage(routes.replaceInvestigator));
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
