import { useWindowDimensions } from "react-native";
import { getButtonStyle, getTextStyle } from "./KeyboardButton.styles";
import type { KeyboardButtonSize } from "./KeyboardButton.types";

export const useButtonStyles = (size?: KeyboardButtonSize) => {
  const box = useWindowDimensions();
  const button = getButtonStyle({
    box,
    size
  })
  const text = getTextStyle({
    box,
    size
  })

  return {
    button,
    text
  }
}