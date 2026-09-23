import {
	selectBoardById,
	setBoardActualPropValue,
	useMainStatPicker,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import {
	selectBoardFaction,
	selectBoardIsInactive,
} from "@modules/mechanics/board/base/entities/lib";
import { makeAction } from "@modules/mechanics/phase/features/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type {
	InvestigatorBoardNumericStat,
	InvestigatorMainStatType,
} from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./OverviewInvestigator.components";
import { useValueControl } from "./useValueControl";

export type OverviewInvestigatorProps = ViewProps & {
	boardId: number;
	selected?: boolean;
	onSelect?: () => void;
};
// @TODO: refactor
export const OverviewInvestigator = ({
	boardId,
	selected = false,
	onSelect,
	...props
}: OverviewInvestigatorProps) => {
	const dispatch = useAppDispatch();
	const control = useValueControl(boardId);
	const { value, baseValue, initialValue, investigator, image } =
		useAppSelector(selectBoardById(boardId));

	const faction = useAppSelector(selectBoardFaction(boardId));
	const inactive = useAppSelector(selectBoardIsInactive(boardId));

	const health = useMainStatPicker({
		value: value.health,
		baseValue: baseValue.health,
	});

	const sanity = useMainStatPicker({
		value: value.sanity,
		baseValue: baseValue.sanity,
	});

	const onActionsPress = useCallback(() => {
		dispatch(makeAction({ boardId }));
	}, [dispatch, boardId]);

	const setMainStat = useCallback(
		(stat: InvestigatorMainStatType, toValue: (picked?: number) => number) =>
			({ value }: PickerChangeEvent) => {
				dispatch(
					setBoardActualPropValue({
						boardId,
						prop: stat,
						value: toValue(value),
					}),
				);
			},
		[dispatch, boardId],
	);

	const withPicker = (type: InvestigatorBoardNumericStat) => ({
		type: "picker" as const,
		value: value[type],
		onValueChanged: control.onChange(type),
	});

	const withMainStat = (
		stat: InvestigatorMainStatType,
		picker: typeof health,
	) => ({
		type: "picker" as const,
		initialValue: initialValue[stat],
		value: picker.value,
		data: picker.data,
		onPress: control.decrease(stat, picker.min),
		onValueChanged: setMainStat(stat, picker.toValue),
	});

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Primary>
					<C.Name>{investigator.name}</C.Name>
					<C.Skills {...value} />
					<C.Stats>
						<C.Health {...withMainStat("health", health)} />
						<C.Sanity {...withMainStat("sanity", sanity)} />
						<C.Clues
							{...withPicker("clues")}
							onPress={control.increase("clues", 100)}
							onLongPress={control.clear("clues")}
						/>
						<C.Resources
							{...withPicker("resources")}
							onPress={control.decrease("resources")}
							onLongPress={control.clear("resources")}
						/>
						<C.Actions {...withPicker("actions")} onPress={onActionsPress} />
					</C.Stats>
				</C.Primary>
				<C.Secondary>
					<C.Image
						size={110}
						faction={faction}
						code={investigator.code}
						imageId={image.id}
						onPress={onSelect}
						selected={selected}
						grayscale={inactive}
					/>
				</C.Secondary>
			</C.Content>
		</C.Container>
	);
};
