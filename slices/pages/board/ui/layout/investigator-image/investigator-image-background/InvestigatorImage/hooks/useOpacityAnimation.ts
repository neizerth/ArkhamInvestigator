import {
	selectCurrentBoardProp,
	selectCurrentIsInactive,
	useAppSelector,
	useFadeAnimation,
} from "@shared/lib";
import { useMemo } from "react";

export const useOpacityAnimation = (code: string) => {
	const inactive = useAppSelector(selectCurrentIsInactive);
	const { id } = useAppSelector(selectCurrentBoardProp("image"));
	const isActiveImage = id === code;

	const show = useMemo(() => {
		if (!isActiveImage) {
			return false;
		}
		return inactive;
	}, [inactive, isActiveImage]);

	return useFadeAnimation({
		show,
	});
};
