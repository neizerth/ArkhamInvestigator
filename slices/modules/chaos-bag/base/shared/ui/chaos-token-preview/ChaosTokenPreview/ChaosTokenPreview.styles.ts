import { size } from "@shared/config";
import type { ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";
import { chaosToken } from "../../../config";

type Options = {
	sealed?: boolean;
	defaultSize?: number;
	offset?: number;
	padding?: number;
};

export const getChaosTokentPreviewStyles = ({
	sealed = false,
	defaultSize = chaosToken.size.default,
	offset = 2,
	padding = size.gap.small,
}: Options) => {
	const container: ViewStyle = {
		padding: sealed ? offset : 0,
	};
	const content: ViewStyle = {
		padding: sealed ? padding + offset : padding,
	};
	const background: SvgProps["style"] = {
		left: offset,
		top: offset,
	};
	const sealedSize = defaultSize - offset * 4;
	const tokenSize = sealed ? sealedSize : defaultSize;

	return {
		container,
		content,
		background,
		size: tokenSize,
		offset,
	};
};
