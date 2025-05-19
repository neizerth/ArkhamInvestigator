import {
	selectBoardById,
	selectShowDamageAndHorror,
	setCurrentStat,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardStat } from "@shared/model";
import type { PickerChangeEvent } from "@widgets/control/picker";
import { range } from "ramda";
import { useCallback, useMemo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./OverviewInvestigator.components";

export type OverviewInvestigatorProps = ViewProps & {
	boardId: number;
	separator?: boolean;
	selected?: boolean;
	onSelect?: () => void;
};

const woundsData = range(0, 20);

export const OverviewInvestigator = ({
	boardId,
	separator = false,
	selected = false,
	onSelect,
	...props
}: OverviewInvestigatorProps) => {
	const dispatch = useAppDispatch();
	const board = useAppSelector(selectBoardById(boardId));
	const showWounds = useAppSelector(selectShowDamageAndHorror);

	const { investigator, value, baseValue } = board;
	const damage = baseValue.health - value.health;
	const horror = baseValue.sanity - value.sanity;

	const maxHealth = baseValue.health;
	const maxSanity = baseValue.sanity;

	const healthData = useMemo(() => {
		return showWounds ? woundsData : range(-20, maxHealth + 1);
	}, [maxHealth, showWounds]);

	const sanityData = useMemo(() => {
		return showWounds ? woundsData : range(-20, maxSanity + 1);
	}, [maxSanity, showWounds]);

	const onStatChanged = useCallback(
		(stat: InvestigatorBoardStat) =>
			({ value = 0 }: PickerChangeEvent) => {
				dispatch(
					setCurrentStat(stat, value, {
						boardId,
					}),
				);
			},
		[dispatch, boardId],
	);

	const withPicker = (type: InvestigatorBoardStat) => ({
		type: "picker" as const,
		value: value[type],
		onValueChanged: onStatChanged(type),
	});

	return (
		<C.Container {...props}>
			{separator && <C.Separator />}
			<C.Content>
				<C.Primary>
					<C.Name>{investigator.name}</C.Name>
					<C.Skills {...value} />
					<C.Stats>
						<C.Health
							{...withPicker("health")}
							value={showWounds ? damage : value.health}
							data={healthData}
						/>
						<C.Sanity
							{...withPicker("sanity")}
							value={showWounds ? horror : value.sanity}
							data={sanityData}
						/>
						<C.Clues {...withPicker("clues")} />
						<C.Resources {...withPicker("resources")} />
						<C.Actions {...withPicker("actions")} />
					</C.Stats>
				</C.Primary>
				<C.Secondary>
					<C.Image
						size={110}
						faction={investigator.faction_code}
						code={investigator.code}
						onPress={onSelect}
						selected={selected}
						grayscale={value.actions === 0}
					/>
				</C.Secondary>
			</C.Content>
		</C.Container>
	);
};
