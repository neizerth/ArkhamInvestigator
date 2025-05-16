import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import { routes } from "@shared/config";
import {
	redo,
	selectAlwaysShowGameText,
	selectBoardsCount,
	selectCurrentBoardProp,
	setValueFromHistoryIndex,
	undo,
	useAppDispatch,
	useAppSelector,
	usePage,
} from "@shared/lib";
import { useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import { InvestigatorSelect } from "../../../../../shared";
import { Sidebar } from "../Sidebar";
import * as C from "./LeftSidebar.components";

export type LeftSidebarProps = ViewProps;

export const LeftSidebar = ({ ...props }: LeftSidebarProps) => {
	const dispatch = useAppDispatch();
	const window = useWindowDimensions();
	const count = useAppSelector(selectBoardsCount);
	const history = useAppSelector(selectCurrentBoardProp("history"));
	const historyIndex = useAppSelector(selectCurrentBoardProp("historyIndex"));

	const showText = useAppSelector(selectAlwaysShowGameText);

	const goToPage = usePage();

	const historyLength = history?.length || 0;

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

	const single = count === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	const compactHistory = showText && !single && window.height < 800;

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

					<C.Group>
						<C.Button
							icon="chaos-bag-thin"
							onPress={goToPage(routes.chaosBagPreview)}
							onLongPress={revealToken}
						/>
					</C.Group>
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
