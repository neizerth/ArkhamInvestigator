import {
	getAbilityIcon,
	selectIsCurrentAbilityUsed,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";
import { Special } from "../Special";
import { useAbility } from "./useAbility";

export type AbilityProps = TouchableOpacityProps & {
	ability: InvestigatorAbility;
};

export const Ability = ({ ability, ...props }: AbilityProps) => {
	const dispatch = useAppDispatch();
	const { id } = ability;

	const isUsed = useAppSelector(selectIsCurrentAbilityUsed(id));
	const icon = getAbilityIcon(ability);
	const onPress = useAbility(ability);

	const removeUses = useCallback(() => {
		dispatch(
			setBoardAbilityUse({
				boardId: "current",
				abilityId: ability.id,
				use: true,
			}),
		);
	}, [dispatch, ability.id]);

	return (
		<Special
			{...props}
			value={!isUsed}
			icon={icon}
			onPress={onPress}
			onLongPress={removeUses}
		/>
	);
};
