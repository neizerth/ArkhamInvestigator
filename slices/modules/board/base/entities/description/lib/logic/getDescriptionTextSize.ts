import { Dimensions } from "react-native";

type Options = {
	unit: number;
	small?: boolean;
};

const screen = Dimensions.get("screen");

const k = screen.height > 740 ? 1 : 0.85;

export const getDescriptionTextSize = ({ unit, small }: Options) => {
	const value = small ? unit * 0.9 : unit;
	return value * k;
};
