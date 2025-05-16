import {
	cancelShowRevealModal,
	selectChaosBagLoadingAnimation,
} from "@features/chaos-bag";
import { selectCurrentLanguage } from "@features/i18n";
import { useSkillItemChaosTokenRevealModal } from "@features/skill-check";
import {
	selectTapToHidePins,
	setBoardProp,
	startSkillCheck,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem } from "@shared/model";
import { always } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import * as C from "./PinnedSkillCheckItem.components";
import { getExpressionDisplayStyle } from "./PinnedSkilllCheckItem.styles";

const emptyCallback = always(false);

export type PinnedSkillCheckItemProps = ViewProps & {
	isLast?: boolean;
	item: SkillCheckHistoryItem;
};

export const PinnedSkillCheckItem = ({
	item,
	isLast,
	...props
}: PinnedSkillCheckItemProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const tapToHide = useAppSelector(selectTapToHidePins);
	const animate = useAppSelector(selectChaosBagLoadingAnimation);

	const displayStyle = getExpressionDisplayStyle(language);

	const { id, type } = item;

	const tapOnPin = useCallback(() => {
		if (tapToHide) {
			dispatch(setBoardProp("showPinnedSkillChecks", false));
			return;
		}
		dispatch(togglePin(id));
	}, [dispatch, tapToHide, id]);

	const setupReveal = useSkillItemChaosTokenRevealModal();

	const closeReveal = useCallback(() => {
		dispatch(cancelShowRevealModal());
		return false;
	}, [dispatch]);

	const onSwipeRight = useCallback(() => {
		if (!tapToHide) {
			return;
		}
		dispatch(togglePin(id));
	}, [dispatch, tapToHide, id]);

	const onSwipeLeft = useCallback(() => {
		dispatch(startSkillCheck(type));
	}, [dispatch, type]);

	const swipeRight = Gesture.Fling()
		.direction(Directions.RIGHT)
		.runOnJS(true)
		.onStart(onSwipeRight);

	const swipeLeft = Gesture.Fling()
		.direction(Directions.LEFT)
		.runOnJS(true)
		.onStart(onSwipeLeft);

	const reveal = useMemo(() => {
		return setupReveal(item);
	}, [setupReveal, item]);

	const onPressIn = animate ? reveal : emptyCallback;
	const onPressOut = animate ? closeReveal : emptyCallback;
	const onLongPress = animate ? emptyCallback : reveal;

	const gestureConfig = Gesture.Exclusive(swipeLeft, swipeRight);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Item
				{...props}
				key={item.id}
				onPress={tapOnPin}
				onPressIn={onPressIn}
				onPressOut={onPressOut}
				onLongPress={onLongPress}
			>
				<C.ItemContent>
					{item.title && <C.Title>{item.title}:</C.Title>}
					<C.Expression
						{...displayStyle}
						data={item.expression}
						value={item.value}
						showDiff={false}
					/>
				</C.ItemContent>
				{!isLast && <C.Text>,</C.Text>}
			</C.Item>
		</GestureDetector>
	);
};
