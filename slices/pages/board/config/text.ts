import { font, IS_WEB } from "@shared/config"
import { PixelRatio } from "react-native";

const ratio = PixelRatio.get();
const scale = 2.5 / ratio;

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