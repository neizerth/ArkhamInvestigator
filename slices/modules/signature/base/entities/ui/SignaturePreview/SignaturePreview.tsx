import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { FactionIcon } from "@modules/faction/shared/ui";
import type { PropsWithFaction } from "@shared/model";
import { memo, useCallback } from "react";
import type { GestureResponderEvent, ViewProps } from "react-native";
import * as C from "./SignaturePreview.components";

export type SignaturePreviewProps = TouchableOpacityProps &
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

export const SignaturePreview = ({
	showIcon = true,
	showOptionsInfo = true,
	faction,
	selected,
	selectedCount = 0,
	icon,
	disabled,
	size,
	selectionStyle,
	grayscale,
	...props
}: SignaturePreviewProps) => {
	const imageId = props.imageId || props.code;

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
			<C.Picture
				code={imageId}
				type="square"
				size={size}
				grayscale={grayscale}
			/>
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

export const SignaturePreviewMemo = memo(SignaturePreview);
