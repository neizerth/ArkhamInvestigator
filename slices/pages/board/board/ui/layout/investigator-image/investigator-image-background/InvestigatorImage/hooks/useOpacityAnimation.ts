import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { selectCurrentIsInactive } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector, useFadeAnimation } from "@shared/lib";
import { useMemo } from "react";

export const useOpacityAnimation = (code: string) => {
	const inactive = useAppSelector(selectCurrentIsInactive);
	const image = useAppSelector(selectCurrentBoardProp("image"));

	const isActiveImage = image?.id === code;

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
