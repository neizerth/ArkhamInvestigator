import { color } from "@shared/config";
import type { PropsWithBox } from "@shared/model";
import type { TextStyle, ViewStyle } from "react-native";

type GetSkillStyleOptions = PropsWithBox;

export const getSkillStyle = ({ box }: GetSkillStyleOptions) => {
	const { width } = box;
	const vw = width / 100;

	const valueContainer: ViewStyle = {
		paddingTop: 1 * vw,
		paddingLeft: 1 * vw,
		width: 10 * vw,
	};
	const background: ViewStyle = {
		borderRadius: 7 * vw,
	};

	const container: ViewStyle = {
		height: box.height * 0.9,
	};

	return {
		container,
		valueContainer,
		background,
	};
};

type GetSkillValueStyleOptions = PropsWithBox & {
	isParallel?: boolean;
	value: number;
	baseValue: number;
};

export const getSkillValueStyle = ({
	value,
	isParallel,
	box,
}: GetSkillValueStyleOptions) => {
	const { width } = box;
	const vw = width / 100;
	const digitsCount = value.toString().length;

	const textColor = isParallel ? color.white : color.text;

	const valueSize: Record<number, number> = {
		1: 9 * vw,
		2: 5.2 * vw,
	};

	const valueText: TextStyle = {
		fontSize: valueSize[digitsCount],
		color: textColor,
	};

	const container: ViewStyle = {
		paddingRight: 9 * vw,
	};

	return {
		text: valueText,
		container,
	};
};
