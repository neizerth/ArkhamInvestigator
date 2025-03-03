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
      top: 0.7,
      left: 0,
      right: -0.2
    }
  },
  '0': {
    icon: 'num0',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '1': {
    icon: 'num1',
    margin: {
      left: -0.14,
      right: -0.4
    }
  },
  '2': {
    icon: 'num2',
    margin: {
      left: 0,
      right: -0.27
    }
  },
  '3': {
    icon: 'num3',
    margin: {
      left: 0,
      right: -0.3
    }
  },
  '4': {
    icon: 'num4',
    margin: {
      left: 0,
      right: -0.26
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
      right: -0.35
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
      left: 0,
      right: -0.3
    }
  }
}