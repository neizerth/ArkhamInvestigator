import type { Box } from "@shared/model";
import type { ViewStyle } from "react-native";

export const getSkillsStyle = ({ width }: Box): ViewStyle => {
  const vw = width / 100;
  return {
    paddingLeft: vw * 5,
    paddingRight: vw * 5,
    paddingTop: vw * 2,
    paddingBottom: vw * 2.5,
    gap: 4 * vw
  }
}