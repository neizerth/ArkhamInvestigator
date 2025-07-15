import { Value, type ValueProps } from "@shared/ui";
import { useMemo } from "react";
import { chaosToken } from "../../config";
import type { ChaosTokenType } from "../../model";

export type ChaosTokenValueProps = ValueProps & {
	type: ChaosTokenType;
};

export const ChaosTokenValue = ({ type, ...props }: ChaosTokenValueProps) => {
	const style = useMemo(() => {
		const color = chaosToken.color.types[type];
		return {
			color,
		};
	}, [type]);
	return <Value {...props} style={[style, props.style]} />;
};
