import { useFadeAnimation } from "@shared/lib";

export const useContentAnimation = (show: boolean) => {
	return useFadeAnimation({
		show,
		delayOut: 200,
		duration: 200,
	});
};
