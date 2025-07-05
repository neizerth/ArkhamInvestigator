import {
	selectModifyChaosTokens,
	setModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { routes } from "@shared/config";
import {
	delay,
	goBack,
	goToPage,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceMenu.components";

export type ReferenceMenuProps = ViewProps;

export const ReferenceMenu = (props: ReferenceMenuProps) => {
	const dispatch = useAppDispatch();

	const editable = useAppSelector(selectModifyChaosTokens);

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const edit = useCallback(async () => {
		dispatch(goBack());
		await delay(100);
		dispatch(goToPage(routes.chaosBagReferenceEdit));
	}, [dispatch]);

	const toggleChange = useCallback(() => {
		dispatch(setModifyChaosTokens(!editable));
	}, [dispatch, editable]);

	const editableIcon = editable ? "eye-blocked" : "eye";

	return (
		<C.Container {...props}>
			<C.Group>
				<C.Action onPress={edit} icon="edit" />
				<C.Action onPress={toggleChange} icon={editableIcon} />
			</C.Group>

			<C.Action onPress={back} icon="close" />
		</C.Container>
	);
};
