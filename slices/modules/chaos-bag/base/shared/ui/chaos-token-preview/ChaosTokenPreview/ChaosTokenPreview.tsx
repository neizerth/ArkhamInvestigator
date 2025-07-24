import { isChaosTokenModified } from "@modules/chaos-bag/value/shared/lib";
import { size } from "@shared/config";
import { memo } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../config";
import type { ChaosTokenConfig } from "../../chaos-token";
import * as C from "./ChaosTokenPreview.components";
import {
	getChaosTokentPreviewStyles,
	getModificationSize,
	getModificationStyle,
} from "./ChaosTokenPreview.styles";

export type ChaosTokenPreviewProps = ViewProps &
	ChaosTokenConfig & {
		sealed?: boolean;
		sealOffset?: number;
		tokenPadding?: number;
		selected?: boolean;
		value?: number;
		defaultValue?: number;
	};

const defaultPadding = size.gap.small;

export const ChaosTokenPreview = ({
	type,
	sealed,
	sealOffset = 2,
	tokenPadding = defaultPadding,
	selected = false,
	highlight = true,
	value,
	defaultValue,
	...props
}: ChaosTokenPreviewProps) => {
	const { size = chaosToken.size.default } = props;
	const options = {
		sealed,
		size,
		offset: sealOffset,
		padding: tokenPadding,
	};
	const style = getChaosTokentPreviewStyles(options);

	const modified = isChaosTokenModified({
		type,
		value,
	});

	const modificationSize = getModificationSize(options);
	const modificationStyle = getModificationStyle(options);

	return (
		<C.Container {...props} style={style.container}>
			{sealed && (
				<C.Sealed width="100%" height="100%" style={style.background} />
			)}
			<C.Content style={style.content}>
				{modified && typeof defaultValue === "number" && (
					<C.Modification
						type={type}
						size={modificationSize}
						value={defaultValue}
						style={modificationStyle}
						sealed={sealed}
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
