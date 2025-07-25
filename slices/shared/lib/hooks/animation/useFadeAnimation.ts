import type { DefaultStyle } from "../../../model/ui/styles";
import {
	type UseBooleanAnimationOptions,
	useBooleanAnimation,
} from "./useBooleanAnimation";

type Options = Omit<
	UseBooleanAnimationOptions<DefaultStyle>,
	"styleResolver" | "enabled"
> & {
	show: boolean;
};

export const useFadeAnimation = ({ show, ...options }: Options) => {
	return useBooleanAnimation({
		...options,
		enabled: show,
		styleResolver(opacity) {
			"worklet";
			return {
				opacity,
			};
		},
	});
};
