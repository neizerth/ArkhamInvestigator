import { Value, type ValueProps, defaultValueFontSizes } from "@shared/ui";
import { useMemo } from "react";
import {
	getChaosTokenValueColor,
	getChaosTokenValueTextColor,
} from "../../lib";
import type { ChaosTokenType } from "../../model";
import { getChaosTokenValueFontSizes } from "./ChaosTokenValue.styles";

export type ChaosTokenValueProps = ValueProps & {
	type: ChaosTokenType;
	modified?: boolean;
};

export const ChaosTokenValue = ({
	type,
	modified,
	sizes = defaultValueFontSizes,
	...props
}: ChaosTokenValueProps) => {
	const options = { type, modified };
	const color = getChaosTokenValueColor(options);
	const textColor = getChaosTokenValueTextColor(options);

	const valueSizes = useMemo(() => {
		return getChaosTokenValueFontSizes({
			modified,
			sizes,
		});
	}, [modified, sizes]);

	const style = useMemo(() => {
		return {
			color,
		};
	}, [color]);

	const textStyle = useMemo(() => {
		return {
			color: textColor,
		};
	}, [textColor]);

	return (
		<Value
			{...props}
			sizes={valueSizes}
			style={[style, props.style]}
			textStyle={[textStyle, props.textStyle]}
		/>
	);
};
