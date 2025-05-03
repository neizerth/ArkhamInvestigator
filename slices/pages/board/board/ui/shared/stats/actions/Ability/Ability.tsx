import type { TouchableOpacityProps } from "@features/haptic";
import {
	getAbilityIcon,
	selectIsAbilityUsed,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { Special } from "../Special";
import { useAbility } from "./abilities";

export type AbilityProps = TouchableOpacityProps & {
	ability: InvestigatorAbility;
};

export const Ability = ({ ability, ...props }: AbilityProps) => {
	const { id } = ability;
	const isUsed = useAppSelector(selectIsAbilityUsed(id));
	const icon = getAbilityIcon(ability);
	const onPress = useAbility(ability);

	return <Special {...props} value={!isUsed} icon={icon} onPress={onPress} />;
};
