import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import { openResetBoardWarning } from "@modules/core/modal/entities/base/lib";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";

export type DescriptionTopMenuProps = ViewProps;

const homeRoute = {
	href: routes.home,
	replace: true,
};

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();

	const goToPage = useLeaveBoard();

	const showClearModal = useCallback(() => {
		dispatch(
			openResetBoardWarning({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.GoHome icon="resign" onPress={goToPage(homeRoute)} />
			<C.Button icon="info" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="stopwatch" onPress={goToPage(routes.roundReference)} />
			<C.Button icon="wrench" onPress={goToPage(routes.settings)} />
			<C.Button icon="repeat" onPress={showClearModal} />
		</C.Container>
	);
};
