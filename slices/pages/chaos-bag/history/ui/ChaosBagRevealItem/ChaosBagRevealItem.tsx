import { removeRevealHistoryItem } from "@features/chaos-bag";
import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
} from "@features/chaos-bag/model";
import { useHapticFeedback } from "@features/haptic";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import {
	goBack,
	selectBoardProp,
	setCurrentInvestigatorIndex,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagRevealItem.components";

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

	const investigator = useAppSelector(selectBoardProp(boardId, "investigator"));

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
		dispatch(removeRevealHistoryItem(id));
		impactFeedback();
	}, [dispatch, id, impactFeedback]);

	if (!investigator) {
		return null;
	}

	const { skillCheckType, skillCheckValue, title } = item;

	const longPress = Gesture.LongPress().runOnJS(true).onStart(removeItem);

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
				</C.List>
			</C.Container>
		</GestureDetector>
	);
};
