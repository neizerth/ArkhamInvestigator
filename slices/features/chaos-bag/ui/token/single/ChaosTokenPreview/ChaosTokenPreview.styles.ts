import { size } from "@shared/config";
import type { ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

export const getChaosTokentPreviewStyles = (sealed = false) => {
	const gap = size.gap.small;
	const offset = 2;
	const defaultSize = 48;

	const container: ViewStyle = {
		padding: sealed ? offset : 0,
	};
	const content: ViewStyle = {
		padding: gap,
	};
	const background: SvgProps["style"] = {
		left: offset,
		top: offset,
	};
	const sealedSize = defaultSize - offset * 2;
	const tokenSize = sealed ? sealedSize : defaultSize;

	return {
		container,
		content,
		background,
		size: tokenSize,
		offset,
	};
};
