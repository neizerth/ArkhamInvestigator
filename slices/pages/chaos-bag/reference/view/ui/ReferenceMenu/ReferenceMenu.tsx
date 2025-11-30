import {
	selectModifyChaosTokens,
	setModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { openChaosTokenRevealModal } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { goBack, goToPage } from "@modules/core/router/shared/lib";
import { routes } from "@shared/config";
import { delay, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceMenu.components";

export type ReferenceMenuProps = ViewProps & {
	returnToReveal?: boolean;
};

export const ReferenceMenu = ({
	returnToReveal,
	...props
}: ReferenceMenuProps) => {
	const dispatch = useAppDispatch();

	const editable = useAppSelector(selectModifyChaosTokens);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const edit = useCallback(async () => {
		back();
		await delay(100);
		dispatch(goToPage(routes.chaosBagReferenceEdit));
	}, [dispatch, back]);

	const toggleChange = useCallback(() => {
		dispatch(setModifyChaosTokens(!editable));
	}, [dispatch, editable]);

	const openRevealModal = useCallback(() => {
		back();
		dispatch(openChaosTokenRevealModal());
	}, [dispatch, back]);

	const editableIcon = editable ? "eye-blocked" : "eye";

	return (
		<C.Container {...props}>
			<C.Group>
				{returnToReveal && (
					<C.Action icon="arrow_back" onPress={openRevealModal} />
				)}
				<C.Action onPress={edit} icon="edit" />
				<C.Action onPress={toggleChange} icon={editableIcon} />
			</C.Group>

			<C.Action onPress={back} icon="close" />
		</C.Container>
	);
};
