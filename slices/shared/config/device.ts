import { capitalize } from "../lib/util/string";
import type { BreakpointSize, DeviceBreakpoints, DeviceBreakpointType, DeviceType } from "../model";
import { Platform } from "react-native";

export const HAVE_AVIF_SUPPORT = Platform.OS !== 'android' || (Platform.OS === 'android' && Platform.Version >= 12)

export const breakpoints: DeviceBreakpoints = {
  default: {
    small: 0,
    medium: 280,
    large: 300
  },
  mobile: {
    small: 320,
    medium: 375,
    large: 425
  },
  tablet: {
    small: 768,
    medium: 1024,
    large: 1366
  },
  desktop: {
    small: 1440,
    medium: 1920,
    large: 2560
  }
}

export const deviceTypes: DeviceType[] = ['default', 'mobile', 'tablet', 'desktop'];
export const breakpointSizes: BreakpointSize[] = ['small', 'medium', 'large'];

export const breakpointsOrder: DeviceBreakpointType[] = deviceTypes.flatMap(
  deviceType => breakpointSizes.map(
    size => `${deviceType}${capitalize(size)}` as DeviceBreakpointType
  )
)