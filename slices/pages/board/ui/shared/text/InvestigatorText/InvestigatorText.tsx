import { useAppTranslation } from "@features/i18n";
import type { ComponentStyleMap } from "@widgets/game-text";
import { mergeDeepRight } from "ramda";
import * as C from "./InvestigatorText.components";
import { getInvestigatorTextStyle } from "./InvestigatorText.styles";
import type { InvestigatorTextProps } from "./InvestigatorText.types";

export const InvestigatorText = (props: InvestigatorTextProps) => {
	const { translate } = useAppTranslation();
	const [text, language] = translate(props.value);

	const { unit = 0 } = props;

	const styleSheet = getInvestigatorTextStyle({
		language,
		unit,
	});

	const componentStyles = mergeDeepRight(
		props.componentStyles || {},
		styleSheet.componentStyles,
	) as ComponentStyleMap;

	return (
		<C.Text
			{...props}
			value={text}
			componentStyles={componentStyles}
			style={[props.style, styleSheet.style]}
		/>
	);
};
