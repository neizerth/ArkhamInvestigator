import { useFadeAnimation } from "@shared/lib";

export const useOpacityAnimation = (inactive: boolean) => {
	return useFadeAnimation({
		show: inactive,
	});
};
