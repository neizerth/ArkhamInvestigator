import { memo } from "react";
import { chaosToken } from "../../../config";
import * as C from "./ChaosToken.components";
import { getChaosTokenParts } from "./ChaosToken.styles";
import type { ChaosTokenProps } from "./ChaosToken.types";

export const ChaosToken = ({
	size = chaosToken.size.default,
	type,
	dark = false,
	selected = false,
	modified = false,
	highlight = true,
	...props
}: ChaosTokenProps) => {
	const parts = getChaosTokenParts({
		type,
		modified,
		highlight,
	});
	return (
		<C.Container {...props} size={size}>
			{parts.map((part) => (
				<C.Part {...part} key={part.icon} size={size} scaleType={false} />
			))}
			{selected && <C.Selection size={size} />}
			<C.Background key={size} type={type} size={size} dark={dark} />
		</C.Container>
	);
};

export const ChaosTokenMemo = memo(ChaosToken);
