import { isChaosTokenModified } from "@modules/chaos-bag/value/shared/lib";
import { memo } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../config";
import type { ChaosTokenConfig } from "../../chaos-token";
import * as C from "./ChaosTokenPreview.components";
import { getChaosTokentPreviewStyles } from "./ChaosTokenPreview.styles";

export type ChaosTokenPreviewProps = ViewProps &
	ChaosTokenConfig & {
		sealed?: boolean;
		sealOffset?: number;
		tokenPadding?: number;
		selected?: boolean;
		value?: number;
		defaultValue?: number;
	};

export const ChaosTokenPreview = ({
	type,
	sealed,
	sealOffset,
	tokenPadding = 0,
	selected = false,
	highlight = true,
	value,
	defaultValue,
	...props
}: ChaosTokenPreviewProps) => {
	const { size = chaosToken.size.default } = props;
	const style = getChaosTokentPreviewStyles({
		sealed,
		offset: sealOffset,
		defaultSize: size,
		padding: tokenPadding,
	});

	const modified = isChaosTokenModified({
		type,
		value,
	});

	return (
		<C.Container {...props} style={style.container}>
			{sealed && (
				<C.Sealed width="100%" height="100%" style={style.background} />
			)}
			<C.Content style={style.content}>
				{modified && typeof defaultValue === "number" && (
					<C.Modification
						type={type}
						size={size}
						padding={tokenPadding}
						value={defaultValue}
					/>
				)}
				{modified && highlight && typeof value === "number" && (
					<C.ModifiedHighlight>
						<C.Highlight value={value} size={size} />
					</C.ModifiedHighlight>
				)}
				<C.Token
					type={type}
					size={style.size}
					selected={selected}
					modified={modified}
					highlight={highlight}
				/>
			</C.Content>
		</C.Container>
	);
};

export const ChaosTokenPreviewMemo = memo(ChaosTokenPreview);
