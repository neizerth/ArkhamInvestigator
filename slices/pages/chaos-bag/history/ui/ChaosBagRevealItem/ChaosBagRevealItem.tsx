import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
} from "@features/chaos-bag/model";
import { selectBoardProp, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
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
	const investigator = useAppSelector(
		selectBoardProp(item.boardId, "investigator"),
	);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<ChaosBagToken>) => {
			return (
				<C.Item>
					<C.Token token={item} position={index + 1} />
				</C.Item>
			);
		},
		[],
	);

	if (!investigator) {
		return null;
	}
	return (
		<C.Container {...props}>
			<C.Position>{position}</C.Position>
			<C.Investigator
				faction={investigator.faction_code}
				code={investigator.id}
				size={48}
				showIcon={false}
			/>
			<C.Separator />
			<C.TokenList data={item.tokens} renderItem={renderItem} horizontal />
		</C.Container>
	);
};
