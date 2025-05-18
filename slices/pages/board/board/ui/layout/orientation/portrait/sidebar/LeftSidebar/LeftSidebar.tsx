import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import { useHapticFeedback } from "@features/haptic";
import { routes } from "@shared/config";
import {
	goToPage,
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
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
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

	const goTo = usePage();

	const historyLength = history?.length || 0;

	const impactHapticFeedback = useHapticFeedback();

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

	const onChaosBagSwipeRight = useCallback(() => {
		impactHapticFeedback();
		revealToken();
	}, [impactHapticFeedback, revealToken]);

	const onChaosBagSwipeDown = useCallback(() => {
		impactHapticFeedback();
		dispatch(goToPage(routes.chaosBagHistory));
	}, [impactHapticFeedback, dispatch]);

	const chaosBagGestures = [
		Gesture.Fling()
			.direction(Directions.RIGHT)
			.runOnJS(true)
			.onStart(onChaosBagSwipeRight),
		Gesture.Fling()
			.direction(Directions.DOWN)
			.runOnJS(true)
			.onStart(onChaosBagSwipeDown),
	];

	const chaosBagGestureConfig = Gesture.Exclusive(...chaosBagGestures);

	const single = count === 1;

	const historyEnabled = historyLength > 0;
	const canUndo = historyEnabled && historyIndex !== -1;
	const canRedo = historyEnabled && historyIndex < historyLength - 1;

	const compactHistory =
		!single && ((showText && window.height < 800) || window.height <= 640);

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
						<GestureDetector gesture={chaosBagGestureConfig}>
							<C.Button
								icon="chaos-bag-thin"
								onPress={goTo(routes.chaosBagPreview)}
								onLongPress={revealToken}
							/>
						</GestureDetector>
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
