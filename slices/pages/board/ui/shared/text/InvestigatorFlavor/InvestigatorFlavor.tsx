import { useInvestigatorTranslation } from "@features/i18n";
import type { InvestigatorBoardSource, PropsWithUnit } from "@shared/model";
import {
	type ComponentStyleMap,
	GameText,
	type GameTextProps,
} from "@widgets/game/game-text";
import { mergeDeepRight } from "ramda";
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles";

export type InvestigatorFlavorProps = Omit<GameTextProps, "value"> &
	Partial<PropsWithUnit> & {
		investigator: InvestigatorBoardSource;
	};

export const InvestigatorFlavor = ({
	unit = 0,
	investigator,
	...props
}: InvestigatorFlavorProps) => {
	const translate = useInvestigatorTranslation(investigator);
	const [text, language] = translate("flavor");

	const localeStyles = getInvestigatorFlavorStyles({
		language,
		unit,
	});

	const componentStyles = mergeDeepRight(
		props.componentStyles || {},
		localeStyles,
	) as ComponentStyleMap;

	return <GameText {...props} componentStyles={componentStyles} value={text} />;
};
