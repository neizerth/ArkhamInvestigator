import { memo } from "react";
import type { ViewProps } from "react-native";
import type { ChaosTokenConfig } from "../chaos-token";
import * as C from "./ChaosTokenPreview.components";
import { getChaosTokentPreviewStyles } from "./ChaosTokenPreview.styles";

export type ChaosTokenPreviewProps = ViewProps &
	ChaosTokenConfig & {
		sealed?: boolean;
		sealOffset?: number;
		tokenPadding?: number;
		selected?: boolean;
	};

export const ChaosTokenPreview = ({
	type,
	sealed,
	sealOffset,
	tokenPadding,
	selected = false,
	...props
}: ChaosTokenPreviewProps) => {
	const style = getChaosTokentPreviewStyles({
		sealed,
		offset: sealOffset,
		defaultSize: props.size,
		padding: tokenPadding,
	});
	return (
		<C.Container {...props} style={style.container}>
			{sealed && (
				<C.Sealed width="100%" height="100%" style={style.background} />
			)}
			<C.Content style={style.content}>
				<C.Token type={type} size={style.size} selected={selected} />
			</C.Content>
		</C.Container>
	);
};

export const ChaosTokenPreviewMemo = memo(ChaosTokenPreview);
