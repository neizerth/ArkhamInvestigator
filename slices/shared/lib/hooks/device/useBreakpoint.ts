import type {
	BreakpointSize,
	DeviceBreakpointType,
	DeviceOrientation,
	DeviceType,
} from "@shared/model";
import { useWindowDimensions } from "react-native";
import { useMediaQuery } from "react-responsive";
import { breakpointSizes, breakpoints, deviceTypes } from "../../../config";
import { capitalize } from "../../util";

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
