import { IS_WEB } from "@shared/config";
import type { Box } from "@shared/model";
import { type TextStyle, type ViewStyle } from "react-native";


export const getSkillStyle = ({ width }: Box) => {
  const vw = width / 100;

  const valueContainer: ViewStyle = {
    paddingTop: 1 * vw,
    paddingLeft: 1 * vw,
    width: 9 * vw
  }
  const value: TextStyle = {
    fontSize: 8 * vw
  }
  return {
    valueContainer,
    value
  }
}