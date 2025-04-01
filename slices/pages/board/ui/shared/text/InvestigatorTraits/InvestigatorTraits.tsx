import { useInvestigatorTranslation } from "@features/i18n";
import * as C from "./InvestigatorTraits.components";
import { getInvestigatorTraitsStyle } from "./InvestigatorTraits.styles";
import type { InvestigatorTraitsProps } from "./InvestigatorTraits.types";

export const InvestigatorTraits = ({
	investigator,
	unit = 0,
	...props
}: InvestigatorTraitsProps) => {
	const translate = useInvestigatorTranslation(investigator);
	const [traits, language] = translate("traits");

	const style = getInvestigatorTraitsStyle({
		unit,
		language,
	});

	return (
		<C.Traits {...props} style={[props.style, style]}>
			{traits}
		</C.Traits>
	);
};
