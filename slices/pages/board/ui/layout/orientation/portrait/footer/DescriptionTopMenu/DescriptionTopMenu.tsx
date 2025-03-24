import { routes } from "@shared/config";
import { goToPage, resetBoard, useAppDispatch, usePage } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";

export type DescriptionTopMenuProps = ViewProps;

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();

	const goToPage = usePage();

	const clear = useCallback(() => {
		dispatch(resetBoard());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Button icon="resign" onPress={goToPage(routes.home)} />
			<C.Button icon="question" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="repeat" onPress={clear} />
		</C.Container>
	);
};
