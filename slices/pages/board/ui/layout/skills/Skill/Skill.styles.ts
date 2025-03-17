import { color, font, IS_WEB } from "@shared/config";
import { sign } from "@shared/lib";
import type { Box, PropsWithBox } from "@shared/model";
import type { TextStyle, ViewStyle } from "react-native";

type GetSkillStyleOptions = PropsWithBox;

export const getSkillStyle = ({ box }: GetSkillStyleOptions) => {
  const { width } = box;
  const vw = width / 100;

  const valueContainer: ViewStyle = {
    paddingTop: 1 * vw,
    paddingLeft: 1 * vw,
    width: 10 * vw,
  }
  const background: ViewStyle = {
    borderRadius: 7 * vw
  }

  const container: ViewStyle = {
    height: box.height * 0.9
  }

  const check: ViewStyle = {
    // left: -1.5 * vw
  }
  return {
    container,
    valueContainer,
    check,
    background
  }
}

type GetSkillValueStyleOptions = PropsWithBox & {
  isParallel?: boolean
  value: number
  baseValue: number
}

export const getSkillValueStyle = ({
  value,
  baseValue,
  isParallel,
  box
}: GetSkillValueStyleOptions) => {
  const { width } = box;
  const vw = width / 100;
  const digitsCount = value.toString().length;

  const textColor = isParallel ? color.white : color.text;

  const valueSize: Record<number, number> = {
    1: 21 * vw * font.scale,
    2: 10 * vw * font.scale
  }

  const valueText: TextStyle = {
    fontSize: valueSize[digitsCount],
    color: textColor
  }

  return valueText;
}