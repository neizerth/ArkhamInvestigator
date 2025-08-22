import { getSignatureImageUrl } from "@modules/signature/shared/api";
import type { PropsWithFaction } from "@shared/model";
import { memo, useCallback } from "react";
import {
	type GestureResponderEvent,
	Platform,
	type TouchableOpacityProps,
	type ViewProps,
} from "react-native";
import { InvestigatorPreviewFactionIcon as FactionIcon } from "../InvestigatorPreviewFactionIcon";
import * as C from "./InvestigatorPreview.components";

export type InvestigatorPreviewProps = TouchableOpacityProps &
	PropsWithFaction & {
		imageId?: string;
		imageVersion?: number;
		selected?: boolean;
		selectedCount?: number;
		code: string;
		icon?: string;
		size: number;
		showIcon?: boolean;
		showOptionsInfo?: boolean;
		selectionStyle?: ViewProps["style"];
		grayscale?: boolean;
	};

const ios = Platform.OS === "ios";

export const InvestigatorPreview = ({
	showIcon = true,
	showOptionsInfo = true,
	faction,
	selected,
	selectedCount = 0,
	icon,
	disabled,
	size,
	selectionStyle,
	...props
}: InvestigatorPreviewProps) => {
	const imageId = props.imageId || props.code;
	const grayscaleImage = props.grayscale && ios;
	const grayscaleFilter = props.grayscale && !ios;
	const uri = getSignatureImageUrl({
		code: imageId,
		type: "square",
		grayscale: grayscaleImage,
	});
	const source = { uri };

	const onPress = useCallback(
		(event: GestureResponderEvent) => {
			if (disabled) {
				return;
			}
			props.onPress?.(event);
		},
		[props.onPress, disabled],
	);

	const containerStyle = {
		width: size,
		height: size,
	};

	return (
		<C.Container
			{...props}
			onPress={onPress}
			style={[props.style, containerStyle]}
		>
			<C.Picture source={source} size={size} grayscale={grayscaleFilter} />
			{showIcon && (
				<C.Info>
					{icon ? (
						<C.ExtraIcon icon={icon} />
					) : (
						<FactionIcon faction={faction} />
					)}
				</C.Info>
			)}
			{disabled && <C.DisabledOverlay />}
			{selected && <C.Selection faction={faction} style={selectionStyle} />}
			{selectedCount > 1 && (
				<C.SelectedCount>
					<C.Count>{selectedCount}</C.Count>
				</C.SelectedCount>
			)}
		</C.Container>
	);
};

export const InvestigatorPreviewMemo = memo(InvestigatorPreview);
