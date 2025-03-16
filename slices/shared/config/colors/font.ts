import { DPR, IS_WEB } from "../device";

const scale = IS_WEB ? 1 : 1.25;

export const font = {
  size: {
    small: 12 * scale,
    default: 14 * scale,
    medium: 16 * scale,
    large: 18 * scale,
    xl: 24 * scale,
    xxl: 28 * scale,
    lead: 32 * scale
  },
  scale
}

