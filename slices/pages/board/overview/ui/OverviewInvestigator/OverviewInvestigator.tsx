import { makeAction } from "@features/game/phase";
import {
	selectBoardById,
	selectShowDamageAndHorror,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
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

const woundsData = range(0, 20);

export const OverviewInvestigator = ({
	boardId,
	selected = false,
	onSelect,
	...props
}: OverviewInvestigatorProps) => {
	const dispatch = useAppDispatch();
	const control = useValueControl(boardId);
	const board = useAppSelector(selectBoardById(boardId));
	const showWounds = useAppSelector(selectShowDamageAndHorror);

	const { investigator, value, baseValue, initialValue, currentRole } = board;
	const faction = currentRole || investigator.faction_code;
	const damage = baseValue.health - value.health;
	const horror = baseValue.sanity - value.sanity;

	const maxHealth = baseValue.health;
	const maxSanity = baseValue.sanity;

	const healthData = useMemo(() => {
		return showWounds ? woundsData : range(-20, maxHealth + 1);
	}, [maxHealth, showWounds]);

	const minHealth = healthData[0];

	const sanityData = useMemo(() => {
		return showWounds ? woundsData : range(-20, maxSanity + 1);
	}, [maxSanity, showWounds]);

	const onActionsPress = useCallback(() => {
		dispatch(makeAction(boardId));
	}, [dispatch, boardId]);

	const minSanity = sanityData[0];

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
						/>
						<C.Sanity
							{...withPicker("sanity")}
							initialValue={initialValue.sanity}
							value={showWounds ? horror : value.sanity}
							data={sanityData}
							onPress={control.decrease("sanity", minSanity)}
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
						imageId={investigator.image.id}
						onPress={onSelect}
						selected={selected}
						grayscale={value.actions === 0}
					/>
				</C.Secondary>
			</C.Content>
		</C.Container>
	);
};
