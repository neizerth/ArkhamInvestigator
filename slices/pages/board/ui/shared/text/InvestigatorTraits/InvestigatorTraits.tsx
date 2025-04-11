import * as C from "./InvestigatorTraits.components";
import { getInvestigatorTraitsStyle } from "./InvestigatorTraits.styles";
import type { InvestigatorTraitsProps } from "./InvestigatorTraits.types";

export const InvestigatorTraits = ({
	investigator,
	unit = 0,
	...props
}: InvestigatorTraitsProps) => {
	const { traits, locale } = investigator;

	const style = getInvestigatorTraitsStyle({
		unit,
		language: locale,
	});

	return (
		<C.Traits {...props} style={[props.style, style]}>
			{traits}
		</C.Traits>
	);
};
