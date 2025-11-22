import type { RevealedChaosBagTokenCancelType } from "@modules/chaos-bag/reveal/base/shared/model";
import { isChaosTokenModified } from "@modules/chaos-bag/value/shared/lib";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { size } from "@shared/config";
import { memo } from "react";
import type { ViewProps } from "react-native";
import { chaosToken } from "../../../config";
import type { ChaosBagTokenSealData } from "../../../model";
import type { ChaosTokenConfig } from "../../chaos-token";
import * as C from "./ChaosTokenPreview.components";
import {
	getChaosTokentPreviewStyles,
	getModificationSize,
	getModificationStyle,
	showValueOverlay,
} from "./ChaosTokenPreview.styles";

export type ChaosTokenPreviewProps = ViewProps &
	ChaosTokenConfig & {
		sealed?: boolean;
		sealData?: ChaosBagTokenSealData | null;
		sealedCount?: number;
		removed?: boolean;
		canceled?: RevealedChaosBagTokenCancelType;
		sealOffset?: number;
		tokenPadding?: number;
		selected?: boolean;
		value?: ChaosTokenValue;
		defaultValue?: number;
		showValue?: boolean;
		showOverlay?: boolean;
		disabled?: boolean;
	};

const defaultPadding = size.gap.small;

export const ChaosTokenPreview = ({
	type,
	sealed,
	sealedCount = 0,
	sealData,
	sealOffset = 2,
	tokenPadding = defaultPadding,
	selected = false,
	highlight = true,
	showValue = false,
	showOverlay = false,
	removed,
	canceled,
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

	const showHighlight = modified && highlight;

	const overlay =
		showOverlay &&
		showValueOverlay({
			showValue,
			type,
			value,
		});

	return (
		<C.Container {...props} style={[props.style, style.container]}>
			{sealed && (
				<C.Sealed width="100%" height="100%" style={style.background} />
			)}
			{sealedCount > 0 && (
				<C.SealedCount>
					<C.SealedCountText>{sealedCount}</C.SealedCountText>
				</C.SealedCount>
			)}
			{!selected && (
				<>
					{sealData?.title && <C.SealedTitle>{sealData.title}</C.SealedTitle>}
					{sealData?.type === "investigator" && (
						<C.SealedPreview>
							<C.BoardPreview
								boardId={sealData.boardId}
								type="square"
								size={size}
							/>
						</C.SealedPreview>
					)}
				</>
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
				{showHighlight && typeof value === "number" && (
					<C.HighlightContainer>
						<C.Highlight value={value} size={size} />
					</C.HighlightContainer>
				)}
				{showValue && typeof value !== "undefined" && (
					<C.TokenValue type={type} value={value} size={size} />
				)}
				{overlay && (
					<C.OverlayLayer>
						<C.Overlay size={style.size} />
					</C.OverlayLayer>
				)}
				{canceled && (
					<C.OverlayLayer>
						<C.CancelIcon
							icon="blocked-medium"
							byEffect={canceled === "effect"}
							size={style.size}
						/>
					</C.OverlayLayer>
				)}
				{removed && (
					<C.RemovedLayer size={style.size}>
						<C.RemovedIcon icon="reply" size={style.size} />
					</C.RemovedLayer>
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
