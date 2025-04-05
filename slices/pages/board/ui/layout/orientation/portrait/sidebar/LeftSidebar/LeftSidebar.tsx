import { PortraitLayoutContext } from "@pages/board/config";
import { InvestigatorSelect } from "@pages/board/ui/shared/features";
import {
	redo,
	selectBoardProp,
	selectInvestigatorBoards,
	setValueFromHistoryIndex,
	undo,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./LeftSidebar.components";

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({ ...props }: LeftSidebarProps) => {
	const dispatch = useAppDispatch();
	const boards = useAppSelector(selectInvestigatorBoards);
	const history = useAppSelector(selectBoardProp("history"));
	const historyIndex = useAppSelector(selectBoardProp("historyIndex"));

	const { height } = useContext(PortraitLayoutContext);
	const historyLength = history.length;

	const onUndo = useCallback(() => {
		dispatch(undo());
	}, [dispatch]);

	const onRedo = useCallback(() => {
		dispatch(redo());
	}, [dispatch]);

	const beginHistory = useCallback(() => {
		dispatch(setValueFromHistoryIndex(0));
	}, [dispatch]);

	const returnToNow = useCallback(() => {
		dispatch(setValueFromHistoryIndex(historyLength - 1));
	}, [dispatch, historyLength]);

	const single = boards.length === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	return (
		<C.Container {...props} single={single} unit={height}>
			<C.History single={single} unit={height}>
				<C.HistoryButton
					onPress={onRedo}
					onLongPress={returnToNow}
					disabled={!canRedo}
				>
					<C.HistoryIcon icon="redo" />
				</C.HistoryButton>
				<C.HistoryButton
					onPress={onUndo}
					onLongPress={beginHistory}
					disabled={!canUndo}
				>
					<C.HistoryIcon icon="undo" />
				</C.HistoryButton>
			</C.History>
			{!single && <InvestigatorSelect />}
		</C.Container>
	);
};
