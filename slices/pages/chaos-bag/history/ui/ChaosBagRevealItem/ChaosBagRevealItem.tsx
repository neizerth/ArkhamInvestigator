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
			return <C.Token token={item} position={index + 1} />;
		},
		[],
	);

	if (!investigator) {
		return null;
	}

	const { skillCheckType, skillCheckValue, title } = item;

	return (
		<C.Container {...props}>
			<C.Position>{position}</C.Position>
			<C.Investigator>
				<C.Image
					faction={investigator.faction_code}
					code={investigator.id}
					size={50}
					showIcon={false}
				/>
				{skillCheckType && (
					<C.SkillType>
						<C.SkillTypeIcon statType={skillCheckType} />
					</C.SkillType>
				)}
				{skillCheckValue && (
					<C.SkillValue>
						<C.SkillValueText value={skillCheckValue} />
					</C.SkillValue>
				)}
			</C.Investigator>
			<C.Separator />
			<C.List>
				<C.TokenList data={item.tokens} renderItem={renderItem} horizontal />
				{title && <C.Title>{title}</C.Title>}
			</C.List>
		</C.Container>
	);
};
