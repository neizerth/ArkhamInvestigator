import {
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import * as C from "./InvestigatorSelect.components";
import { useGestures } from "./useGestures";

export type InvestigatorSelectProps = ViewProps;

export const InvestigatorSelect = ({ ...props }: InvestigatorSelectProps) => {
	const dispatch = useAppDispatch();

	const next = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const prev = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	const gesture = useGestures();

	return (
		<C.Container {...props}>
			<C.Up onPress={prev}>
				<C.IconContainer>
					<C.UpIcon />
				</C.IconContainer>
			</C.Up>
			<GestureDetector gesture={gesture}>
				<C.Value boardId="current" />
			</GestureDetector>
			<C.Down onPress={next}>
				<C.IconContainer>
					<C.DownIcon />
				</C.IconContainer>
			</C.Down>
		</C.Container>
	);
};
