import { memo } from "react";
import type { ChaosTokenProps } from "../ChaosToken";
import * as C from "./ChaosTokenPreview.components";

export type ChaosTokenPreviewProps = ChaosTokenProps & {
	sealed?: boolean;
};

export const ChaosTokenPreview = ({
	type,
	size,
	...props
}: ChaosTokenPreviewProps) => {
	return (
		<C.Container {...props}>
			<C.Token type={type} size={size} />
		</C.Container>
	);
};

export const ChaosTokenPreviewMemo = memo(ChaosTokenPreview);
