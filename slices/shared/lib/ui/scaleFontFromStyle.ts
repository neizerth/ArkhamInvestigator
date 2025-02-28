import { type StyleProp, StyleSheet, type TextStyle } from "react-native";
import { font } from "@shared/config";

export const scaleFontFromStyle = (scale: number, style?: StyleProp<TextStyle>) => {
  const { 
    fontSize = font.size.default
  } = StyleSheet.flatten(style);

  const scaledFontSize = fontSize * scale;
  
  return {
    fontSize,
    scaledFontSize
  };
}