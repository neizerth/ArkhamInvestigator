import {
	selectBoardsCount,
	selectCurrentBoardProp,
} from "@modules/board/base/shared/lib";
import {
	redo,
	setValueFromHistoryIndex,
	undo,
} from "@modules/board/history/features/lib";
import { selectChaosBagEnabled } from "@modules/chaos-bag/base/entities/lib";
import { useAppDispatch, useAppSelector, useDispatchAction } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Sidebar } from "../../Sidebar";
import * as C from "./LeftSidebar.components";

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({ ...props }: LeftSidebarProps) => {
	const dispatch = useAppDispatch();
	const count = useAppSelector(selectBoardsCount);
	const chaosBagEnabled = useAppSelector(selectChaosBagEnabled);
	const history = useAppSelector(selectCurrentBoardProp("history"));
	const historyIndex = useAppSelector(selectCurrentBoardProp("historyIndex"));

	const historyLength = history?.length || -1;

	const onUndo = useDispatchAction(undo);

	const onRedo = useDispatchAction(redo);

	const beginHistory = useCallback(() => {
		dispatch(
			setValueFromHistoryIndex({
				boardId: "current",
				historyIndex: -1,
			}),
		);
	}, [dispatch]);

	const returnToNow = useCallback(() => {
		dispatch(
			setValueFromHistoryIndex({
				boardId: "current",
				historyIndex: historyLength - 1,
			}),
		);
	}, [dispatch, historyLength]);

	const single = count === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	return (
		<Sidebar {...props}>
			<C.Container>
				<C.Buttons>
					<C.HistoryGroup>
						<C.Button
							onPress={onRedo}
							onLongPress={returnToNow}
							disabled={!canRedo}
							icon="redo"
						/>
						<C.Button
							onPress={onUndo}
							onLongPress={beginHistory}
							disabled={!canUndo}
							icon="undo"
						/>
					</C.HistoryGroup>

					{chaosBagEnabled && (
						<C.Group>
							<C.ChaosBag />
						</C.Group>
					)}
				</C.Buttons>
			</C.Container>
		</Sidebar>
	);
};
