import { Dimensions } from "react-native";

type Options = {
	unit: number;
	scale: number;
};

const screen = Dimensions.get("screen");

const k = screen.height > 740 ? 1 : 0.85;

export const getDescriptionTextSize = ({ unit, scale }: Options) => {
	const value = unit * scale;
	return value * k;
};
