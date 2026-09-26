import { useScreenOrientation } from "@modules/core/device/shared/lib";
import { useMemo } from "react";
import { getAppTheme } from "./getAppTheme";

export const useTheme = () => {
	const orientation = useScreenOrientation();

	return useMemo(() => getAppTheme(orientation), [orientation]);
};
