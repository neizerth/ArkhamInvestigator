import type { ViewStyle } from "react-native";
import type { CharType } from "./IconNumber.types";

export type CharConfig = {
  icon: string
  fontSize?: number
  margin: {
    top?: number
    left: number
    right: number
  }
}

export const charConfig: Record<CharType, CharConfig> = {
  '+': {
    icon: 'plus'
  },
  '-': {
    icon: 'minus'
  },
  '0': {
    icon: 'num0'
  },
  '1': {
    icon: 'num1'
  },
  '2': {
    icon: 'num2'
  },
  '3': {
    icon: 'num3'
  },
  '4': {
    icon: 'num4'
  },
  '5': {
    icon: 'num5'
  },
  '6': {
    icon: 'num6'
  },
  '7': {
    icon: 'num7'
  },
  '8': {
    icon: 'num8'
  },
  '9': {
    icon: 'num9'
  }
}