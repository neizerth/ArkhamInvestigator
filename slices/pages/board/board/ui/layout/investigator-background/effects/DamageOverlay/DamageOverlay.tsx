import {
	selectCurrentActualPropValue,
	selectCurrentBasePropValue,
} from "@modules/board/base/shared/lib";
import { selectCurrentDamage } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./DamageOverlay.components";

export type DamageOverlayProps = ViewProps;

export const DamageOverlay = (props: DamageOverlayProps) => {
	const damage = useAppSelector(selectCurrentDamage);
	const health = useAppSelector(selectCurrentActualPropValue("health"));
	const baseHealth = useAppSelector(selectCurrentBasePropValue("health"));

	const percentage = (damage * 100) / baseHealth;

	return (
		<C.Container {...props}>
			{damage > 0 && <C.FirstBlood />}
			{percentage >= 30 && <C.Damage30 />}
			{percentage >= 50 && <C.Damage50 />}

			{percentage >= 60 && <C.Damage60 />}
			{percentage >= 75 && (
				<>
					<C.Damage75 />
					<C.Damage75_2 />
				</>
			)}
			{health < 2 && <C.AlmostDead />}
		</C.Container>
	);
};
