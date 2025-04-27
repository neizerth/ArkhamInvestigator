import { memo } from "react";
import type { TouchableOpacityProps } from "../../../../../haptic";
import type { ChaosTokenConfig } from "../ChaosToken";
import * as C from "./ChaosTokenPreview.components";
import { getChaosTokentPreviewStyles } from "./ChaosTokenPreview.styles";

export type ChaosTokenPreviewProps = TouchableOpacityProps &
	ChaosTokenConfig & {
		sealed?: boolean;
	};

export const ChaosTokenPreview = ({
	type,
	sealed,
	...props
}: ChaosTokenPreviewProps) => {
	const style = getChaosTokentPreviewStyles(sealed);
	return (
		<C.Container {...props} style={style.container}>
			{sealed && (
				<C.Sealed width="100%" height="100%" style={style.background} />
			)}
			<C.Content style={style.content}>
				<C.Token type={type} size={style.size} />
			</C.Content>
		</C.Container>
	);
};

export const ChaosTokenPreviewMemo = memo(ChaosTokenPreview);
