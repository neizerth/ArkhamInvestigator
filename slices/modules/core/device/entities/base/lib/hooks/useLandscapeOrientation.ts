import { selectScreenOrientationType } from "@modules/core/device/shared/lib";
import { useAppSelector } from "@shared/lib";

export const useLandscapeOrientation = () => {
	const orientation = useAppSelector(selectScreenOrientationType);
	return orientation === "landscape";
};
