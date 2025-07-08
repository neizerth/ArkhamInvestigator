import { placeDoomOnAgenda } from "@features/game/phase";
import {
	selectDoom,
	selectShowDoom,
	setDoom,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./StepDoom.components";

export type StepDoomProps = ViewProps;

export const StepDoom = (props: StepDoomProps) => {
	const dispatch = useAppDispatch();
	const doom = useAppSelector(selectDoom);
	const show = useAppSelector(selectShowDoom);

	const increaseDoom = useCallback(() => {
		dispatch(placeDoomOnAgenda());
	}, [dispatch]);

	const decreaseDoom = useCallback(() => {
		const value = Math.max(0, doom - 1);
		dispatch(setDoom(value));
	}, [dispatch, doom]);

	if (!show) {
		return null;
	}

	return (
		<C.Container {...props} onPress={increaseDoom} onLongPress={decreaseDoom}>
			<C.Control value={doom} />
		</C.Container>
	);
};
