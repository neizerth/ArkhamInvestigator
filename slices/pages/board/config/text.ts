import { font, DPR, IS_WEB } from "@shared/config"

const scale = IS_WEB ? 1.25 : 2.1 / DPR;

const textSize = font.size.medium * scale;

export const boardText = {
  ratio: {
    traits: 14 / textSize,
    text: 16 / textSize,
    icon: 14 / textSize,
    flavor: 14 / textSize,
  },
  scale
}