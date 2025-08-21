import { selectShowDamageAndHorrorEffects } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import { LayoutContext } from "../../../../config";
import * as C from "./InvestigatorBackground.components";

export type InvestigatorBackgroundProps = ViewProps;

export const InvestigatorBackground = ({
	...props
}: InvestigatorBackgroundProps) => {
	const { view } = useContext(LayoutContext);
	const showEffects = useAppSelector(selectShowDamageAndHorrorEffects);

	return (
		<C.Container {...props} view={view}>
			<C.Content>
				<C.FactionBackground />
				<C.Background />
				{showEffects && (
					<>
						<C.Damage />
						<C.Horror />
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
