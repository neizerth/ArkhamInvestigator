import { selectChaosBagEnabled } from "@features/game/chaos-bag";
import {
	redo,
	selectAlwaysShowGameText,
	selectBoardsCount,
	selectCurrentBoardProp,
	setValueFromHistoryIndex,
	undo,
	useAppDispatch,
	useAppSelector,
	useDispatchAction,
} from "@shared/lib";
import { useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import { InvestigatorSelect } from "../../../../../../shared";
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

	const historyLength = history?.length || 0;

	const onUndo = useDispatchAction(undo);

	const onRedo = useDispatchAction(redo);

	const beginHistory = useCallback(() => {
		dispatch(setValueFromHistoryIndex(-1));
	}, [dispatch]);

	const returnToNow = useCallback(() => {
		dispatch(setValueFromHistoryIndex(historyLength - 1));
	}, [dispatch, historyLength]);

	const single = count === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	const compactHistory =
		!single &&
		chaosBagEnabled &&
		((showText && window.height < 800) || window.height <= 640);

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
						<InvestigatorSelect />
					</C.Group>
				)}
			</C.Container>
		</Sidebar>
	);
};
