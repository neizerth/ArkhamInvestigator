import type { Box } from "@shared/model";
import type { TextStyle, ViewStyle } from "react-native";


export const getSkillStyle = ({ width }: Box) => {
  const vw = width / 100;

  const valueContainer: ViewStyle = {
    paddingTop: 3 * vw,
    paddingRight: 12 * vw,
    paddingLeft: 3 * vw
  }
  const value: TextStyle = {
    fontSize: 8.5 * vw
  }
  return {
    valueContainer,
    value
  }
}