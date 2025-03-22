import { goToPage, resetBoard, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";

export type DescriptionTopMenuProps = ViewProps;

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();

	const goHome = useCallback(() => {
		dispatch(goToPage("/"));
	}, [dispatch]);

	const clear = useCallback(() => {
		dispatch(resetBoard());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Exit onPress={goHome} />
			<C.Clear onPress={clear} />
		</C.Container>
	);
};
