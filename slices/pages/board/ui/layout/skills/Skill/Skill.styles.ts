import { color, IS_WEB } from "@shared/config";
import type { Box, PropsWithBox } from "@shared/model";
import { type TextStyle, type ViewStyle } from "react-native";

type GetSkillStyleOptions = PropsWithBox & {
  isParallel?: boolean
  value: number
}
export const getSkillStyle = ({ box, isParallel, value }: GetSkillStyleOptions) => {
  const { width } = box;
  const vw = width / 100;
  const textColor = isParallel ? color.white : color.text;

  const digitsCount = value.toString().length;

  const valueSize: Record<number, number> = {
    1: 8 * vw,
    2: 6.2 * vw,
    3: 4.2 * vw
  }

  const valueContainer: ViewStyle = {
    paddingTop: 1 * vw,
    paddingLeft: 1 * vw,
    width: 9 * vw
  }
  const valueText: TextStyle = {
    fontSize: valueSize[digitsCount],
    color: textColor
  }
  const background: ViewStyle = {
    borderRadius: 7 * vw
  }

  const check: ViewStyle = {
    // left: -1.5 * vw
  }
  return {
    valueContainer,
    value: valueText,
    check,
    background
  }
}
