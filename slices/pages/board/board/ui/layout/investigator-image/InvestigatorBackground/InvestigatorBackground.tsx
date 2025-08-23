import { selectShowDamageAndHorrorEffects } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackground.components";

export type InvestigatorBackgroundProps = ViewProps;

export const InvestigatorBackground = ({
	...props
}: InvestigatorBackgroundProps) => {
	const showEffects = useAppSelector(selectShowDamageAndHorrorEffects);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.FactionBackground />
				<C.BackgroundImageProvider />
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
