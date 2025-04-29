import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import { routes } from "@shared/config";
import {
	redo,
	selectCurrentBoardProp,
	selectInvestigatorBoards,
	setValueFromHistoryIndex,
	undo,
	useAppDispatch,
	useAppSelector,
	usePage,
} from "@shared/lib";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import { PortraitLayoutContext } from "../../../../../../config";
import { InvestigatorSelect } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./LeftSidebar.components";

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({ ...props }: LeftSidebarProps) => {
	const dispatch = useAppDispatch();
	const boards = useAppSelector(selectInvestigatorBoards);
	const history = useAppSelector(selectCurrentBoardProp("history"));
	const historyIndex = useAppSelector(selectCurrentBoardProp("historyIndex"));

	const goToPage = usePage();

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

	const revealToken = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(true));
	}, [dispatch]);

	const single = boards.length === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	return (
		<Sidebar {...props}>
			<C.Container single={single} unit={height}>
				<C.Buttons single={single} unit={height}>
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
					<C.Button
						icon="chaos-bag-thin"
						onPress={goToPage(routes.chaosBagPreview)}
						onLongPress={revealToken}
					/>
				</C.Buttons>
				{!single && <InvestigatorSelect />}
			</C.Container>
		</Sidebar>
	);
};
