export type BreakpointSize = 'small' | 'medium' | 'large';

export type DeviceType = 'default' | 'mobile' | 'tablet' | 'desktop';

export type DeviceBreakpointType = `${DeviceType}${Capitalize<BreakpointSize>}`

export type DeviceBreakpoints = Record<
  DeviceType,
  Record<BreakpointSize, number>
>

export type DeviceOrientation = 'landscape' | 'portrait';