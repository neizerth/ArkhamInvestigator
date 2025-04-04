import { LayoutContext } from "@pages/board/config";
import { selectShowDamageAndHorrorEffects, useAppSelector } from "@shared/lib";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImage.components";

export type InvestigatorImageProps = ViewProps;

export const InvestigatorImage = ({ ...props }: InvestigatorImageProps) => {
	const { view, layout } = useContext(LayoutContext);
	const showEffects = useAppSelector(selectShowDamageAndHorrorEffects);

	return (
		<C.Container {...props} view={view}>
			<C.Content>
				<C.FactionBackground view={view} layout={layout} />
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
