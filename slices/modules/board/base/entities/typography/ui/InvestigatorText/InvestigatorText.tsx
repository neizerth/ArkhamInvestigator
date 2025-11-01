import { GameText } from "@modules/core/theme/shared/ui";
import type { ComponentStyleMap } from "@shared/ui";
import { mergeDeepRight } from "ramda";
import { getInvestigatorTextStyle } from "./InvestigatorText.styles";
import type { InvestigatorTextProps } from "./InvestigatorText.types";

export const InvestigatorText = (props: InvestigatorTextProps) => {
	const { text, locale } = props.investigator;

	const { unit = 0 } = props;

	const styleSheet = getInvestigatorTextStyle({
		language: locale,
		unit,
	});

	const componentStyles = mergeDeepRight(
		props.componentStyles || {},
		styleSheet.componentStyles,
	) as ComponentStyleMap;

	return (
		<GameText
			{...props}
			value={text}
			componentStyles={componentStyles}
			style={[styleSheet.style, props.style]}
		/>
	);
};
