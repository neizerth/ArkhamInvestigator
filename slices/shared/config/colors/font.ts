import { PixelRatio } from "react-native";

const scale = PixelRatio.get() / 2;

export const font = {
  size: {
    small: 12 * scale,
    default: 14 * scale,
    medium: 16 * scale,
    large: 18 * scale
  },
  scale
}

