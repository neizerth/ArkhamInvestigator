import {
	selectCurrentBoardAbilities,
	selectHaveAdditionalAction,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./SpecialActions.components";

export type SpecialActionsProps = ViewProps;

export const SpecialActions = (props: SpecialActionsProps) => {
	const haveAdditionalAction = useAppSelector(selectHaveAdditionalAction);

	const abilities = useAppSelector(selectCurrentBoardAbilities);

	return (
		<C.Container {...props}>
			{haveAdditionalAction && <C.Additional />}
			{abilities.map((ability, index) => {
				const props = {
					ability,
					index,
				};
				if (ability.type === "counter") {
					return <C.Counter key={ability.id} {...ability} {...props} />;
				}
				return <C.Ability key={ability.id} {...props} />;
			})}
		</C.Container>
	);
};
