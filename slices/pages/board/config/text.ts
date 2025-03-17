import { font, DPR, IS_WEB, DEVICE_FONT_SCALE } from "@shared/config"

const scale = DEVICE_FONT_SCALE;
const textSize = font.size.medium * 1.75;

export const boardText = {
  ratio: {
    traits: font.size.default / textSize,
    text: font.size.medium / textSize,
    icon: font.size.default / textSize,
    flavor: font.size.default / textSize,
  },
  scale
}