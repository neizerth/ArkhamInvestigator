import type { PropsWithUnit } from "@shared/model";
import {
	type ComponentStyleMap,
	GameText,
	type GameTextProps,
} from "@widgets/game/game-text";
import type { InvestigatorSignature } from "arkham-investigator-data";
import { mergeDeepRight } from "ramda";
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles";

export type InvestigatorFlavorProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorSignature;
	};

export const InvestigatorFlavor = ({
	unit = 0,
	investigator,
	...props
}: InvestigatorFlavorProps) => {
	const { flavor, locale } = investigator;

	const localeStyles = getInvestigatorFlavorStyles({
		language: locale,
		unit,
	});

	const componentStyles = mergeDeepRight(
		props.componentStyles || {},
		localeStyles,
	) as ComponentStyleMap;

	return (
		<GameText {...props} componentStyles={componentStyles} value={flavor} />
	);
};
