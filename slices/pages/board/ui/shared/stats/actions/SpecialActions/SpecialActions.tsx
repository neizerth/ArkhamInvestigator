import {
	selectBoardAbilities,
	selectCurrentStatBaseValue,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./SpecialActions.components";

export type SpecialActionsProps = ViewProps;

export const SpecialActions = (props: SpecialActionsProps) => {
	const haveAdditionalAction = useAppSelector(
		selectCurrentStatBaseValue("additionalAction"),
	);

	const abilities = useAppSelector(selectBoardAbilities);

	return (
		<C.Container {...props}>
			{haveAdditionalAction && <C.Additional />}
			{abilities.map((ability) => (
				<C.Ability key={ability.id} ability={ability} />
			))}
		</C.Container>
	);
};
