import { font } from "@shared/config"

const scale = 1.1;

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