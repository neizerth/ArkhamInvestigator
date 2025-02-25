export type Box = {
  width: number
  height: number
}

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