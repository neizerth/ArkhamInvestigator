import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";
import { selectBoardSpecialAbilities } from "@modules/mechanics/board/abilities/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./SpecialActions.components";

export type SpecialActionsProps = ViewProps;

export const SpecialActions = (props: SpecialActionsProps) => {
	const abilities = useAppSelector(selectBoardSpecialAbilities("current"));

	return (
		<C.Container {...props}>
			{abilities.map((ability, index) => {
				const props = {
					ability,
					index,
				};
				if (ability.id === additionalActionAbilityId) {
					return <C.Additional key={ability.id} />;
				}
				if (ability.type === "counter") {
					return <C.Counter key={ability.id} {...ability} {...props} />;
				}
				return <C.Ability key={ability.id} {...props} />;
			})}
		</C.Container>
	);
};
