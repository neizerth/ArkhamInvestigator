import { openResetBoardWarning } from "@modules/core/modal/entities/base/lib";
import { routes } from "@shared/config";
import { replacePageTo, useAppDispatch, usePage } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./DescriptionTopMenu.components";

export type DescriptionTopMenuProps = ViewProps;

export const DescriptionTopMenu = ({ ...props }: DescriptionTopMenuProps) => {
	const dispatch = useAppDispatch();

	const goToPage = usePage();

	const goHome = useCallback(() => {
		dispatch(replacePageTo(routes.home));
	}, [dispatch]);

	const showClearModal = useCallback(() => {
		dispatch(
			openResetBoardWarning({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	return (
		<C.Container {...props}>
			<C.GoHome icon="resign" onPress={goHome} />
			<C.Button icon="info" onPress={goToPage(routes.boardHelp)} />
			<C.Button icon="stopwatch" onPress={goToPage(routes.roundReference)} />
			<C.Button icon="wrench" onPress={goToPage(routes.settings)} />
			<C.Button icon="repeat" onPress={showClearModal} />
		</C.Container>
	);
};
