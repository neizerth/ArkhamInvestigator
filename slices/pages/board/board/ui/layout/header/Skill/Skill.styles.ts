import { color } from "@shared/config";
import type { SkillType } from "@shared/model";
import type { TextStyle, ViewStyle } from "react-native";

const { round: rnd } = Math;

export const getSkillStyle = (width: number) => {
	const vw = width / 10;
	const valueContainer: ViewStyle = {
		paddingTop: rnd(vw),
		paddingLeft: rnd(vw),
		borderRadius: rnd(7 * vw),
	};
	const background: ViewStyle = {
		borderRadius: rnd(7 * vw),
	};

	const container: ViewStyle = {};

	const iconFontSize = rnd(vw * 10.5);

	const icon: TextStyle = {
		fontSize: iconFontSize,
		lineHeight: iconFontSize,
	};

	const iconContainer: ViewStyle = {
		paddingRight: rnd(vw),
	};

	return {
		container,
		valueContainer,
		background,
		icon,
		iconContainer,
	};
};

type GetSkillValueStyleOptions = {
	width: number;
	type: SkillType;
	isParallel?: boolean;
	value: number | string;
	baseValue: number;
	signed: boolean;
};

export const getSkillValueStyle = ({
	type,
	value,
	isParallel,
	signed,
	width,
}: GetSkillValueStyleOptions) => {
	const vw = rnd(width / 10);
	const digitsCount = value.toString().length;

	const textColor = isParallel ? color.white : color.text;

	const unsignedValueSize: Record<number, number> = {
		1: rnd(9 * vw),
		2: rnd(4.7 * vw),
	};

	const signedValueSize: Record<number, number> = {
		1: rnd(9 * vw),
		2: rnd(6.2 * vw),
		3: rnd(4.2 * vw),
	};

	const valueSize = signed ? signedValueSize : unsignedValueSize;

	const fontSize = valueSize[digitsCount];

	const valueText: TextStyle = {
		fontSize,
		color: textColor,
	};

	const container: ViewStyle = {
		paddingRight: rnd(1.1 * width),
		paddingBottom: rnd(2.3 * vw),
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
	};

	const diffSize: Record<number, number> = {
		1: rnd(5.7 * vw),
		2: rnd(5 * vw),
	};

	const diffFontSize = diffSize[digitsCount];

	const diff: TextStyle = {
		fontSize: diffFontSize,
		color: color.skill[type].light,
	};
	const diffContainer: ViewStyle = {
		top: rnd((5.7 * vw - diffFontSize) / 2),
		right: rnd(-vw * 1.5),
	};
	return {
		text: valueText,
		container,
		diff,
		diffContainer,
	};
};
