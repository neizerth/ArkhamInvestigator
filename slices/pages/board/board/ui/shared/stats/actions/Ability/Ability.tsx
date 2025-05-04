import type { TouchableOpacityProps } from "@features/haptic";
import {
	getAbilityIcon,
	selectIsAbilityUsed,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { unsetAbilityUse } from "@shared/lib/store/features/board/actions/stats/ability/unsetAbilityUse";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";
import { Special } from "../Special";
import { useAbility } from "./abilities";

export type AbilityProps = TouchableOpacityProps & {
	ability: InvestigatorAbility;
};

export const Ability = ({ ability, ...props }: AbilityProps) => {
	const dispatch = useAppDispatch();
	const { id } = ability;

	const isUsed = useAppSelector(selectIsAbilityUsed(id));
	const icon = getAbilityIcon(ability);
	const onPress = useAbility(ability);

	const removeUses = useCallback(() => {
		dispatch(unsetAbilityUse(ability.id));
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
