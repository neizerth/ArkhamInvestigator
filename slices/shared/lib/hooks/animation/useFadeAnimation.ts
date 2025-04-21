import { useBooleanAnimation } from "./useBooleanAnimation";

type Options = {
	show: boolean;
	duration?: number;
};

export const useFadeAnimation = ({ show, duration }: Options) => {
	return useBooleanAnimation({
		enabled: show,
		duration,
		styleResolver(opacity) {
			"worklet";
			return {
				opacity,
			};
		},
	});
};
