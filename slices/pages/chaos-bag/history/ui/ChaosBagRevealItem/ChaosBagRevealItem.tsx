import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { removeRevealHistoryItem } from "@modules/chaos-bag/reveal/history/shared/lib";
import { useLongPress } from "@modules/core/touch/shared/lib";
import { REMOVE_CLIPPED_SUBVIEWS } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
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

	const showPosition = tokens.length > 1;

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<RevealedChaosBagToken>) => {
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

	const keyExtractor = useCallback(
		(_: RevealedChaosBagToken, index: number) => {
			return index.toString();
		},
		[],
	);

	const removeItem = useCallback(() => {
		dispatch(
			removeRevealHistoryItem({
				id,
			}),
		);
	}, [dispatch, id]);

	if (!investigator) {
		return null;
	}

	const { title, skillCheckExpression } = item;

	const longPress = useLongPress({
		onLongPress: removeItem,
	});

	const expressionStyles = getExpressionDisplayStyles();

	return (
		<GestureDetector gesture={longPress}>
			<C.Container {...props}>
				<C.Position>{position}</C.Position>

				<C.SkillCheck boardId={boardId} item={item} />

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
