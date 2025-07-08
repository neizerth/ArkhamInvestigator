import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
} from "@features/game/chaos-bag/model";
import {
	selectBoardProp,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { removeRevealHistoryItem } from "@modules/chaos-bag/reveal/history/shared/lib";
import { useHapticFeedback } from "@modules/core/haptic/shared/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { goBack, useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagRevealItem.components";
import { getExpressionDisplayStyles } from "./ChaosBagRevealItem.styles";

export type ChaosBagRevealItemProps = ViewProps & {
	position: number;
	item: ChaosBagHistoryItem;
};

export const ChaosBagRevealItem = ({
	item,
	position,
	...props
}: ChaosBagRevealItemProps) => {
	const dispatch = useAppDispatch();

	const { boardId, tokens, id } = item;

	const investigator = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "investigator",
		}),
	);

	const index = boardId - 1;

	const showPosition = tokens.length > 1;

	const selectBoard = useCallback(() => {
		dispatch(setCurrentInvestigatorIndex(index));
		dispatch(goBack());
	}, [dispatch, index]);

	const impactFeedback = useHapticFeedback();

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagToken>) => {
			return (
				<C.Token
					token={item}
					position={index + 1}
					showPosition={showPosition}
				/>
			);
		},
		[showPosition],
	);

	const keyExtractor = useCallback((_: ChaosBagToken, index: number) => {
		return index.toString();
	}, []);

	const removeItem = useCallback(() => {
		dispatch(
			removeRevealHistoryItem({
				id,
			}),
		);
		impactFeedback();
	}, [dispatch, id, impactFeedback]);

	if (!investigator) {
		return null;
	}

	const { skillCheckType, skillCheckValue, title, skillCheckExpression } = item;

	const longPress = Gesture.LongPress().runOnJS(true).onStart(removeItem);

	const expressionStyles = getExpressionDisplayStyles();

	return (
		<GestureDetector gesture={longPress}>
			<C.Container {...props}>
				<C.Position>{position}</C.Position>

				<C.Investigator>
					<C.Image
						faction={investigator.faction_code}
						code={investigator.id}
						imageId={investigator.image.id}
						size={50}
						showIcon={false}
						onPress={selectBoard}
					/>
					{skillCheckType && (
						<C.SkillType>
							<C.SkillTypeIcon statType={skillCheckType} />
						</C.SkillType>
					)}
					{typeof skillCheckValue === "number" && (
						<C.SkillValue>
							<C.SkillValueText value={skillCheckValue} />
						</C.SkillValue>
					)}
				</C.Investigator>

				<C.Separator />
				<C.List>
					<C.TokenList
						data={tokens}
						keyExtractor={keyExtractor}
						renderItem={renderItem}
						removeClippedSubviews={REMOVE_CLIPPED_SUBVIEWS}
						horizontal
					/>
					{title && (
						<C.Title>
							<C.TitleText ellipsizeMode="tail" numberOfLines={1}>
								{title}
							</C.TitleText>
						</C.Title>
					)}
					{!title &&
						skillCheckExpression &&
						skillCheckExpression.length > 0 && (
							<C.Title>
								<C.Expression
									{...expressionStyles}
									data={skillCheckExpression}
								/>
							</C.Title>
						)}
				</C.List>
			</C.Container>
		</GestureDetector>
	);
};
