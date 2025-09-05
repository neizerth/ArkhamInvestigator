import { getKeyConfig } from "@shared/lib";
import type { TextStyle, ViewStyle } from "react-native";
import { currentScenarioReferenceSize as refSize } from "../../config";

export const refUnit = (value: number) =>
	Math.round((refSize.width * value) / 100);
export const refPx = (value: number) => `${refUnit(value)}px`;

const u = refUnit;

type Options = {
	language: string;
	name: string;
};

export const getScenarioReferenceStyle = ({ language, name }: Options) => {
	const underline = getKeyConfig<ViewStyle>({
		default: {
			bottom: 0,
			gap: u(0.8),
		},
		ru: {
			bottom: u(-0.3),
		},
		ko: {
			bottom: u(-1.8),
		},
		zh: {
			bottom: u(-1),
		},
		"zh-cn": {
			bottom: u(-2),
		},
	})(language);

	const scale = getTitleSizeScale(name);
	const titleFontSize = u(8) * scale;

	const titleText = getKeyConfig<TextStyle>({
		default: {
			fontSize: titleFontSize,
		},
		ko: {
			fontSize: u(6),
		},
		zh: {
			fontSize: u(6),
		},
		"zh-cn": {
			fontSize: u(6),
		},
	})(language);

	const content = getKeyConfig<ViewStyle>({
		default: {
			top: u(23),
		},
		ko: {
			top: u(25),
			gap: u(3),
		},
		zh: {
			top: u(24),
		},
		"zh-cn": {
			top: u(24),
		},
	})(language);

	const header = getKeyConfig<ViewStyle>({
		default: {
			gap: u(0.5),
		},
		ru: {
			gap: u(1.5),
		},
		ko: {
			gap: u(3),
		},
		zh: {
			top: 0,
			gap: u(1),
		},
		"zh-cn": {
			top: 0,
			gap: u(1),
		},
	})(language);

	return {
		content,
		underline,
		titleText,
		header,
	};
};

const getTitleSizeScale = (text: string) => {
	const { length } = text;

	if (length > 30) {
		return 0.8;
	}

	if (length > 40) {
		return 0.7;
	}

	return 1;
};
