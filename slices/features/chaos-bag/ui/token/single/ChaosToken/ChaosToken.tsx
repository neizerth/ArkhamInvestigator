import { memo } from "react";
import * as C from "./ChaosToken.components";
import { getChaosTokenParts } from "./ChaosToken.styles";
import type { ChaosTokenProps } from "./ChaosToken.types";

export const ChaosToken = ({
	size = 48,
	type,
	dark = false,
	selected = false,
	...props
}: ChaosTokenProps) => {
	const parts = getChaosTokenParts(type) || [];
	return (
		<C.Container {...props} size={size}>
			{parts.map((part) => (
				<C.Part {...part} key={part.icon} size={size} scaleType={false} />
			))}
			{selected && <C.Selection size={size} />}
			<C.Background type={type} size={size} dark={dark} />
		</C.Container>
	);
};

export const ChaosTokenMemo = memo(ChaosToken);
