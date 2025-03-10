import { color, IS_WEB } from "@shared/config";
import { sign } from "@shared/lib";
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

  const valueSign = sign(value);
  const digitsCount = value.toString().length * valueSign;

  const valueSize: Record<number, number> = {
    1: 8 * vw,
    2: 4.5 * vw,
    3: 4.8 * vw,
    [-2]: 5 * vw,
    [-3]: 3.8 * vw,
  }

  const valueContainer: ViewStyle = {
    paddingTop: 1 * vw,
    paddingLeft: 1 * vw,
    width: 10 * vw,
  }
  const valueText: TextStyle = {
    fontSize: valueSize[digitsCount],
    color: textColor
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
    value: valueText,
    check,
    background
  }
}
