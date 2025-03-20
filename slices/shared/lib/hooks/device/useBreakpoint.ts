import { breakpointSizes, breakpoints, deviceTypes } from "@shared/config";
import { capitalize } from "@shared/lib/util";
import type {
	BreakpointSize,
	DeviceBreakpointType,
	DeviceOrientation,
	DeviceType,
} from "@shared/model/features/device";
import { useWindowDimensions } from "react-native";
import { useMediaQuery } from "react-responsive";

export type BreakpointInfo = {
	deviceType: DeviceType;
	breakpoint: DeviceBreakpointType;
	breakpointSize: BreakpointSize;
	size: number;
	orientation: DeviceOrientation;
};
export const useBreakpoint = (): BreakpointInfo => {
	const { width } = useWindowDimensions();
	const isPortrait = useMediaQuery({ orientation: "portrait" });

	const orientation: DeviceOrientation = isPortrait ? "portrait" : "landscape";

	for (const deviceType of deviceTypes) {
		for (const breakpointSize of breakpointSizes) {
			const size = breakpoints[deviceType][breakpointSize];

			if (width <= size) {
				const breakpoint =
					`${deviceType}${capitalize(breakpointSize)}` as DeviceBreakpointType;

				return {
					deviceType,
					breakpointSize,
					size,
					breakpoint,
					orientation,
				};
			}
		}
	}

	return {
		deviceType: "mobile",
		breakpointSize: "small",
		breakpoint: "mobileSmall",
		size: breakpoints.mobile.small,
		orientation,
	};
};
