import {
	selectShowAdditionalInformation,
	selectTapToHidePins,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { useSkillItemChaosTokenRevealModal } from "@modules/board/skill-check/features/chaos-token-reveal";
import {
	startSkillCheck,
	toggleCurrentSkillCheckHistoryItemPin as togglePin,
} from "@modules/board/skill-check/shared/lib";
import type { SkillCheckHistoryItem } from "@modules/board/skill-check/shared/model";
import {
	selectChaosOddsBySkill,
	selectShowChaosBagOdds,
	selectShowPinnedCalculationOdds,
} from "@modules/chaos-bag/odds/shared/lib";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./PinnedSkillCheckItem.components";
import { getExpressionDisplayStyle } from "./PinnedSkilllCheckItem.styles";

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
	const showInfo = useAppSelector(selectShowAdditionalInformation);
	const showChaosBagOdds = useAppSelector(selectShowChaosBagOdds);
	const showPinnedCalculationOdds = useAppSelector(
		selectShowPinnedCalculationOdds,
	);

	const showOdds = showChaosBagOdds && (showInfo || showPinnedCalculationOdds);

	const skillOddsMatrix = useAppSelector((state) =>
		selectChaosOddsBySkill(state, item.value),
	);

	const odds = showOdds && skillOddsMatrix?.[0];

	const displayStyle = getExpressionDisplayStyle(language);

	const { id, type } = item;

	const tapOnPin = useCallback(() => {
		if (tapToHide) {
			dispatch(
				setBoardProp({
					boardId: "current",
					prop: "showPinnedSkillChecks",
					value: false,
				}),
			);
			return;
		}
		dispatch(togglePin({ id }));
	}, [dispatch, tapToHide, id]);

	const setupReveal = useSkillItemChaosTokenRevealModal();

	const onSwipeRight = useCallback(() => {
		if (!tapToHide) {
			return false;
		}
		dispatch(togglePin({ id }));
	}, [dispatch, tapToHide, id]);

	const onSwipeDown = useCallback(() => {
		dispatch(startSkillCheck(type));
	}, [dispatch, type]);

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: onSwipeRight,
	});

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: onSwipeDown,
	});

	const reveal = useMemo(() => {
		return setupReveal(item);
	}, [setupReveal, item]);

	const gestureConfig = Gesture.Exclusive(swipeDown, swipeRight);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Item {...props} key={item.id} onPress={tapOnPin} onLongPress={reveal}>
				<C.ItemContent>
					{item.title && <C.Title>{item.title}:</C.Title>}
					<C.Expression
						{...displayStyle}
						data={item.expression}
						value={item.value}
						showDiff={false}
						odds={odds}
					/>
				</C.ItemContent>
				{!isLast && <C.Text>,</C.Text>}
			</C.Item>
		</GestureDetector>
	);
};
