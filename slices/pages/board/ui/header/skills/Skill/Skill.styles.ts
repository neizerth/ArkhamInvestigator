import { color, IS_WEB } from "@shared/config";
import type { Box, PropsWithBox } from "@shared/model";
import { type TextStyle, type ViewStyle } from "react-native";

type GetSkillStyleOptions = PropsWithBox & {
  isParallel?: boolean
}
export const getSkillStyle = ({ box, isParallel }: GetSkillStyleOptions) => {
  const { width } = box;
  const vw = width / 100;
  const textColor = isParallel ? color.white : color.text;

  const valueContainer: ViewStyle = {
    paddingTop: 1 * vw,
    paddingLeft: 1 * vw,
    width: 9 * vw
  }
  const value: TextStyle = {
    fontSize: 8 * vw,
    color: textColor
  }
  return {
    valueContainer,
    value
  }
}