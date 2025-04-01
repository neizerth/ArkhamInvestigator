import { useInvestigatorTranslation } from "@features/i18n";
import type { InvestigatorBoardSource, PropsWithUnit } from "@shared/model";
import { UnscaledText } from "@shared/ui";
import type { TextProps } from "react-native";
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles";

export type InvestigatorFlavorProps = TextProps &
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

	const style = getInvestigatorFlavorStyles({
		language,
		unit,
	});

	return (
		<UnscaledText {...props} style={[props.style, style]}>
			{text}
		</UnscaledText>
	);
};
