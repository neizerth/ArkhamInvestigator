import { useFadeAnimation } from "../../../../lib";

export const useOpacityAnimation = (inactive: boolean) => {
	return useFadeAnimation({
		show: inactive,
	});
};
