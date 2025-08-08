import type { IconLayer, LayeredIconProps } from "@shared/ui";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { chaosToken } from "../../../config";
import { getChaosTokenValueColor } from "../../../lib";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenIcon.components";

export type ChaosTokenIconProps = Omit<LayeredIconProps, "layers"> & {
	icon: string;
	foregroundScale?: number;
	scale?: number;
	backgroundIcon: string;
	type: ChaosTokenType;
	modified?: boolean;
	foregroundColor?: string;
	backgroundColor?: string;
};

export const ChaosTokenIcon = ({
	type,
	scale = 1,
	foregroundScale = 1,
	modified,
	icon,
	backgroundIcon,
	foregroundColor,
	backgroundColor,
	...props
}: ChaosTokenIconProps) => {
	const outlineColor = getChaosTokenValueColor({
		type,
		modified,
	});

	const style = StyleSheet.flatten(props.style);
	const size = style.fontSize || 48;
	const fontSize = size * scale;
	const foregroundFontSize = fontSize * foregroundScale;

	const color = foregroundColor || outlineColor;

	const bgColor = backgroundColor || chaosToken.color.value.numeric;

	const layers: IconLayer[] = useMemo(() => {
		return [
			{
				icon,
				fontSize: foregroundFontSize,
				color,
			},
			{
				icon: backgroundIcon,
				fontSize,
				color: bgColor,
			},
		];
	}, [icon, backgroundIcon, fontSize, foregroundFontSize, color, bgColor]);

	return <C.Icon layers={layers} {...props} />;
};
