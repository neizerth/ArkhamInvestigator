import { color } from "@shared/config";
import type { PropsWithBox, SkillType } from "@shared/model";
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
	type: SkillType;
	isParallel?: boolean;
	value: number;
	baseValue: number;
};

export const getSkillValueStyle = ({
	type,
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
		2: 5 * vw,
	};

	const fontSize = valueSize[digitsCount];

	const valueText: TextStyle = {
		fontSize,
		color: textColor,
	};

	const container: ViewStyle = {
		paddingRight: 11 * vw,
		paddingBottom: 2 * vw,
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
	};

	const diffSize: Record<number, number> = {
		1: 4 * vw,
		2: 3.5 * vw,
	};

	const diffFontSize = diffSize[digitsCount];

	const diff: TextStyle = {
		fontSize: diffFontSize,
		color: color.skill[type].light,
	};
	const diffContainer: ViewStyle = {
		top: (4 * vw - diffFontSize) / 2,
		right: -vw * 2.3,
	};

	return {
		text: valueText,
		container,
		diff,
		diffContainer,
	};
};
