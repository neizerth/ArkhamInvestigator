import { selectCurrentInvestigatorIndex, useAppSelector } from "@shared/lib";
import { memo } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorImageBackground.components";
import { useBackgrounds } from "./hooks";
export type InvestigatorImageBackgroundProps = ViewProps;

export const InvestigatorImageBackground = ({
	...props
}: InvestigatorImageBackgroundProps) => {
	const backgrounds = useBackgrounds();
	const currentIndex = useAppSelector(selectCurrentInvestigatorIndex);

	return (
		<C.Container {...props}>
			{backgrounds.map((background, index) => {
				const style = {
					opacity: index === currentIndex ? 1 : 0,
				};
				return (
					<C.Background {...background} key={background.code} style={style} />
				);
			})}
		</C.Container>
	);
};

export const InvestigatorImageBackgroundMemo = memo(
	InvestigatorImageBackground,
);
