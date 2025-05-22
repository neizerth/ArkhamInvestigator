import { routes } from "@shared/config";
import { delay, goBack, goToPage, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ReferenceMenu.components";

export type ReferenceMenuProps = ViewProps;

export const ReferenceMenu = (props: ReferenceMenuProps) => {
	const dispatch = useAppDispatch();

	const back = useCallback(() => {
		dispatch(goBack());
	}, [dispatch]);

	const edit = useCallback(async () => {
		dispatch(goBack());
		await delay(100);
		dispatch(goToPage(routes.chaosBagReferenceEdit));
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Action onPress={edit} icon="edit" />

			<C.Action onPress={back} icon="close" />
		</C.Container>
	);
};
