import {
	selectAllowNegativeHealthAndSanity,
	selectBoardById,
	selectShowDamageAndHorror,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import {
	selectBoardDamage,
	selectBoardFaction,
	selectBoardHorror,
	selectBoardIsInactive,
} from "@modules/mechanics/board/base/entities/lib";
import { makeAction } from "@modules/mechanics/phase/entities/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
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
	const showWounds = useAppSelector(selectShowDamageAndHorror);

	const faction = useAppSelector(selectBoardFaction(boardId));
	const damage = useAppSelector(selectBoardDamage(boardId));
	const horror = useAppSelector(selectBoardHorror(boardId));
	const inactive = useAppSelector(selectBoardIsInactive(boardId));

	const allowNegativeValues = useAppSelector(
		selectAllowNegativeHealthAndSanity,
	);

	const maxHealth = baseValue.health;
	const maxSanity = baseValue.sanity;

	const minValue = allowNegativeValues ? -20 : 0;

	const healthData = useMemo(() => {
		return showWounds
			? range(0, allowNegativeValues ? 20 : maxHealth + 1)
			: range(minValue, maxHealth + 1);
	}, [maxHealth, showWounds, minValue, allowNegativeValues]);

	const minHealth = healthData[0];

	const sanityData = useMemo(() => {
		return showWounds
			? range(0, allowNegativeValues ? 20 : maxSanity + 1)
			: range(minValue, maxSanity + 1);
	}, [maxSanity, showWounds, minValue, allowNegativeValues]);

	const onActionsPress = useCallback(() => {
		dispatch(makeAction(boardId));
	}, [dispatch, boardId]);

	const minSanity = sanityData[0];

	const setWounds = useCallback(
		(stat: "health" | "sanity") =>
			({ value = 0 }: PickerChangeEvent) => {
				const base = baseValue[stat];
				console.log("base", base);
				console.log("value", value);
				dispatch(
					setBoardActualPropValue({
						boardId,

						prop: stat,
						value: base - value,
					}),
				);
			},
		[dispatch, boardId, baseValue],
	);

	const withPicker = (type: InvestigatorBoardNumericStat) => ({
		type: "picker" as const,
		value: value[type],
		onValueChanged: control.onChange(type),
	});

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Primary>
					<C.Name>{investigator.name}</C.Name>
					<C.Skills {...value} />
					<C.Stats>
						<C.Health
							{...withPicker("health")}
							initialValue={initialValue.health}
							value={showWounds ? damage : value.health}
							data={healthData}
							onPress={control.decrease("health", minHealth)}
							onValueChanged={
								showWounds ? setWounds("health") : control.onChange("health")
							}
						/>
						<C.Sanity
							{...withPicker("sanity")}
							initialValue={initialValue.sanity}
							value={showWounds ? horror : value.sanity}
							data={sanityData}
							onPress={control.decrease("sanity", minSanity)}
							onValueChanged={
								showWounds ? setWounds("sanity") : control.onChange("sanity")
							}
						/>
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
