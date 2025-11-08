import { giveUpkeepResourcesToAllBoards } from "@modules/mechanics/phase/features/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./StepResources.components";

export type StepResourcesProps = ViewProps;

export const StepResources = (props: StepResourcesProps) => {
	const dispatch = useAppDispatch();

	const giveResources = useCallback(() => {
		dispatch(giveUpkeepResourcesToAllBoards());
	}, [dispatch]);

	return (
		<C.Container {...props} onPress={giveResources}>
			<C.Icon />
		</C.Container>
	);
};
