import { useUICallback } from "@modules/core/ui/lib";
import type { SliderProps as BaseProps } from "@react-native-community/slider";
import * as C from "./Slider.components";
export type SliderProps = BaseProps;

export const Slider = ({
	onValueChange: onValueChangeProp,
	...props
}: SliderProps) => {
	const onValueChange = useUICallback({
		payload: {
			source: "slider",
			type: "change",
		},
		callback: onValueChangeProp,
	});
	return <C.Slider {...props} onValueChange={onValueChange} />;
};
