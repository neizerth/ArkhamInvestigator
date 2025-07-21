import { memo } from "react";
import * as C from "./ChaosToken.components";
import { getChaosTokenParts } from "./ChaosToken.styles";
import type { ChaosTokenPartType, ChaosTokenProps } from "./ChaosToken.types";

const defaultPartTypes: ChaosTokenPartType[] = ["fill", "highlight", "overlay"];

export const ChaosToken = ({
	size = 48,
	type,
	dark = false,
	selected = false,
	partTypes = defaultPartTypes,
	...props
}: ChaosTokenProps) => {
	const parts =
		getChaosTokenParts({
			type,
			partTypes,
		}) || [];
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
