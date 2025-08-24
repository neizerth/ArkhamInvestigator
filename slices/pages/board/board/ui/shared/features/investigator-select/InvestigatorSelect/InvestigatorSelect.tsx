import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import {
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSelect.components";

export type InvestigatorSelectProps = ViewProps;

export const InvestigatorSelect = ({ ...props }: InvestigatorSelectProps) => {
	const dispatch = useAppDispatch();
	const goToPage = useLeaveBoard();

	const next = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const prev = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.Up onPress={next}>
				<C.IconContainer>
					<C.UpIcon />
				</C.IconContainer>
			</C.Up>
			<C.Value
				boardId="current"
				onPress={next}
				onLongPress={goToPage(routes.overview)}
			/>
			<C.Down onPress={prev}>
				<C.IconContainer>
					<C.DownIcon />
				</C.IconContainer>
			</C.Down>
		</C.Container>
	);
};
