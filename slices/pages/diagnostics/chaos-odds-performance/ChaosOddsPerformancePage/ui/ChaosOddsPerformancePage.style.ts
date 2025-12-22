import { size } from "@shared/config";
import type { TextStyle, ViewStyle } from "react-native";

export const columnStyles: ViewStyle[] = [
	{
		width: 100,
		flex: 1,
	},
	{ flex: 1 },
	{ flex: 1 },
	{ flex: 1 },
	{ flex: 1 },
];

export const headerStyle: ViewStyle = {
	paddingBlock: size.gap.small,
	alignItems: "center",
};

export const cellStyle: ViewStyle = {
	paddingBlock: size.gap.small,
};

export const cellTextStyle: TextStyle = {};

export const formatDuration = (ms: number) => {
	if (ms < 1000) {
		return `${ms.toFixed(0)}ms`;
	}
	const seconds = ms / 1000;
	if (seconds < 10) {
		return `${seconds.toFixed(3)}s`;
	}
	if (seconds < 60) {
		return `${seconds.toFixed(2)}s`;
	}
	const minutes = seconds / 60;
	return `${minutes.toFixed(2)}m`;
};
