import {
	selectAlwaysShowGameText,
	selectBoardsCount,
	selectCurrentBoardProp,
} from "@modules/board/base/shared/lib";
import {
	redo,
	setValueFromHistoryIndex,
	undo,
} from "@modules/board/history/features/lib";
import { selectChaosBagEnabled } from "@modules/chaos-bag/base/shared/lib";
import { useAppDispatch, useAppSelector, useDispatchAction } from "@shared/lib";
import { useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import { Sidebar } from "../../Sidebar";
import * as C from "./LeftSidebar.components";

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({ ...props }: LeftSidebarProps) => {
	const dispatch = useAppDispatch();
	const window = useWindowDimensions();
	const count = useAppSelector(selectBoardsCount);
	const chaosBagEnabled = useAppSelector(selectChaosBagEnabled);
	const history = useAppSelector(selectCurrentBoardProp("history"));
	const historyIndex = useAppSelector(selectCurrentBoardProp("historyIndex"));

	const showText = useAppSelector(selectAlwaysShowGameText);

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

	const compactHistory =
		!single &&
		chaosBagEnabled &&
		((showText && window.height < 750) || window.height <= 640);

	return (
		<Sidebar {...props}>
			<C.Container single={single}>
				<C.Buttons single={single}>
					<C.HistoryGroup compact={compactHistory}>
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
				{!single && (
					<C.Group>
						<C.BoardSelect />
					</C.Group>
				)}
			</C.Container>
		</Sidebar>
	);
};
