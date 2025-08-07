import type { IconLayer, LayeredIconProps } from "@shared/ui";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { chaosToken } from "../../../config";
import { getChaosTokenValueColor } from "../../../lib";
import type { ChaosTokenType } from "../../../model";
import * as C from "./ChaosTokenIcon.components";

export type ChaosTokenIconProps = Omit<LayeredIconProps, "layers"> & {
	icon: string;
	scale?: number;
	backgroundIcon: string;
	type: ChaosTokenType;
	modified?: boolean;
	backgroundColor?: string;
};

const foregroundColor = chaosToken.color.value.numeric;

export const ChaosTokenIcon = ({
	type,
	scale = 1,
	modified,
	icon,
	backgroundIcon,
	backgroundColor,
	...props
}: ChaosTokenIconProps) => {
	const outlineColor = getChaosTokenValueColor({
		type,
		modified,
	});

	const { fontSize } = StyleSheet.flatten(props.style);
	const foregroundFontSize = fontSize && fontSize * scale;

	const bgColor = backgroundColor || outlineColor;

	const layers: IconLayer[] = useMemo(() => {
		return [
			{
				icon,
				fontSize: foregroundFontSize,
				color: foregroundColor,
			},
			{
				icon: backgroundIcon,
				fontSize,
				color: bgColor,
			},
		];
	}, [icon, backgroundIcon, fontSize, foregroundFontSize, bgColor]);

	return <C.Icon layers={layers} {...props} />;
};
