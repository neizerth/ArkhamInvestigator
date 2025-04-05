import type { SliderProps as BaseProps } from "@react-native-community/slider";
import * as C from "./Slider.components";
export type SliderProps = BaseProps;

export const Slider = (props: SliderProps) => {
	return <C.Slider {...props} />;
};
