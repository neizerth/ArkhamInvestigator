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
    icon: 'plus',
    fontSize: 0.4,
    margin: {
      left: 0,
      right: 0
    }
  },
  '-': {
    icon: 'minus',
    fontSize: 0.15,
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '0': {
    icon: 'num0',
    margin: {
      top: -0.05,
      left: 0,
      right: 0
    }
  },
  '1': {
    icon: 'num1',
    margin: {
      left: 0,
      right: -0.45
    }
  },
  '2': {
    icon: 'num2',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '3': {
    icon: 'num3',
    margin: {
      left: 0,
      right: -0.34
    }
  },
  '4': {
    icon: 'num4',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '5': {
    icon: 'num5',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '6': {
    icon: 'num6',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '7': {
    icon: 'num7',
    margin: {
      left: 0,
      right: -0.4
    }
  },
  '8': {
    icon: 'num8',
    margin: {
      left: 0,
      right: -0.32
    }
  },
  '9': {
    icon: 'num9',
    margin: {
      top: -0.05,
      left: 0,
      right: -0.3
    }
  }
}