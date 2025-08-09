import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type { ViewProps, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";
import { chaosToken } from "../../../config";
import type { ChaosTokenType } from "../../../model";

type Options = {
	size: number;
	padding: number;
	sealed?: boolean;
	offset: number;
};

export const getChaosTokentPreviewStyles = ({
	sealed = false,
	size,
	offset,
	padding,
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
	const sealedSize = size - offset * 4;
	const tokenSize = sealed ? sealedSize : size;

	return {
		container,
		content,
		background,
		size: tokenSize,
		offset,
	};
};

export const getModificationSize = ({
	sealed,
	size,
	offset,
	padding,
}: Options) => {
	if (!sealed) {
		return size;
	}

	return size - 4 * offset - 2 * padding;
};

export const getModificationStyle = (options: Options): ViewProps["style"] => {
	const { sealed, padding, offset } = options;
	const offsetTop = sealed ? padding - offset : padding;
	const offsetLeft = sealed ? padding * 1.5 : padding;
	const k = sealed ? 0.22 : 0.3;
	const size = options.size * k;
	const top = (options.size - size) / 2 + offsetTop;
	const left = -size * 0.3 + offsetLeft;

	return {
		top,
		left,
		width: size,
		height: size,
	};
};

export const showValueOverlay = ({
	showValue,
	value,
	type,
}: {
	showValue: boolean;
	type: ChaosTokenType;
	value?: ChaosTokenValue;
}) => {
	if (value === "fail" || value === "success") {
		return true;
	}
	if (showValue && chaosToken.types.symbolic.base.includes(type)) {
		return true;
	}
	return false;
};
