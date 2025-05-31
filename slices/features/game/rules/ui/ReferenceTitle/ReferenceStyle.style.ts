import { getKeyConfig } from "@shared/lib";
import type { ViewStyle } from "react-native";

type Options = {
	fontSize: number;
	language: string;
};

export const getReferenceStyle = ({ fontSize, language }: Options) => {
	const u = (value: number) => Math.round((fontSize * value) / 100);

	const underline = getKeyConfig<ViewStyle>({
		default: {
			bottom: u(-10),
		},
		ru: {
			bottom: u(-15),
		},
		ko: {
			bottom: u(-25),
		},
		zh: {
			bottom: u(-25),
		},
		"zh-cn": {
			bottom: u(-25),
		},
	})(language);

	return {
		underline,
	};
};
