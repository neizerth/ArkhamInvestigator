export type Box = {
  width: number
  height: number
}

export type RectPosition = BoxPosition & {
  right: number
  bottom: number
}

export type BoxRect = Box & RectPosition;

export type ScaledBox = Box & {
  scale: number
}

export type BoxPosition = {
  left: number
  top: number
}

export type BoxLayout = Box & BoxPosition;

export type ScaledBoxLayout = ScaledBox & BoxPosition;

export type Orientation = 'landscape' | 'portrait';