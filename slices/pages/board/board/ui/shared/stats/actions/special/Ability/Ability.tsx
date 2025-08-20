import {
	getAbilityIcon,
	selectIsCurrentAbilityUsed,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { selectCanUseBoardAbility } from "@modules/mechanics/board/abilities/features/base/lib";
import { checkAbilityCodes } from "@modules/mechanics/board/abilities/shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";
import { AbilityView } from "../AbilityView";
import { useAbility } from "./useAbility";

export type AbilityProps = TouchableOpacityProps & {
	ability: InvestigatorAbility;
};

export const Ability = ({ ability, ...props }: AbilityProps) => {
	const dispatch = useAppDispatch();
	const { id } = ability;

	const canUse = useAppSelector(selectCanUseBoardAbility(id));
	const isUsed = useAppSelector(selectIsCurrentAbilityUsed(id));
	const icon = getAbilityIcon(ability);
	const onPress = useAbility(ability);

	const removeUses = useCallback(() => {
		dispatch(
			setBoardAbilityUse({
				boardId: "current",
				abilityId: ability.id,
				canUse: true,
			}),
		);
	}, [dispatch, ability.id]);

	const enabled = isUsed || canUse;
	const inverted = checkAbilityCodes.includes(ability.id);

	return (
		<AbilityView
			{...props}
			enabled={enabled}
			value={!isUsed}
			type={inverted ? "checked" : "crossed"}
			icon={icon}
			onPress={onPress}
			onLongPress={removeUses}
		/>
	);
};
