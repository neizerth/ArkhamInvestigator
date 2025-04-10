import type { TouchableOpacityProps } from "@features/haptic";
import {
	getAbilityIcon,
	selectCurrentBoardProp,
	selectIsAbilityUsed,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { toggleAbilityUse } from "@shared/lib/store/features/board/actions/stats/ability";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { useCallback } from "react";
import { Special } from "../Special";

export type AbilityProps = TouchableOpacityProps & {
	ability: InvestigatorAbility;
};

export const Ability = ({ ability, ...props }: AbilityProps) => {
	const { id } = ability;
	const dispatch = useAppDispatch();
	const boardId = useAppSelector(selectCurrentBoardProp("id"));
	const isUsed = useAppSelector(selectIsAbilityUsed(id));
	const icon = getAbilityIcon(ability);

	const toggleAbility = useCallback(() => {
		dispatch(toggleAbilityUse(id));
	}, [dispatch, id]);

	return (
		<Special {...props} value={!isUsed} icon={icon} onPress={toggleAbility} />
	);
};
