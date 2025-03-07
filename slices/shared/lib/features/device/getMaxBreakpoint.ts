import { breakpointsOrder } from "../../config";
import type { DeviceBreakpointType } from "../../model";
import { ascend, identity, last } from "ramda";

export const getMaxBreakpoint = <T>(
  queries: Partial<
    Record<DeviceBreakpointType, T>
  >
) => (deviceType: DeviceBreakpointType) => {
    const availableDeviceTypes = Object.keys(queries) as DeviceBreakpointType[];
    const currentIndex = breakpointsOrder.indexOf(deviceType);
    const availableIndexes = availableDeviceTypes
      .map(
        breakpoint => breakpointsOrder.indexOf(breakpoint)
      )
      .sort(ascend(identity))
      .filter(index => index <= currentIndex);

    const lastIndex = last(availableIndexes);

    const name = lastIndex ? breakpointsOrder[lastIndex] : availableDeviceTypes[0];

    return queries[name] as T;
  }