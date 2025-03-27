import { useAppTranslation } from "@features/i18n";
import type { PropsWithUnit } from "@shared/model";
import { UnscaledText } from "@shared/ui";
import type { TextProps } from "react-native";
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles";

export type InvestigatorFlavorProps = TextProps &
	Partial<PropsWithUnit> & {
		value: string;
	};

export const InvestigatorFlavor = ({
	unit = 0,
	value,
	...props
}: InvestigatorFlavorProps) => {
	const { translate } = useAppTranslation();
	const [text, language] = translate(value || "");

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
