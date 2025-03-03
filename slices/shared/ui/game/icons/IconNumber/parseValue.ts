import { v4 } from "uuid"
import { Char, Sign } from "./IconNumber.components";
import type { CharProps, CharType } from "./IconNumber.types";
import { CharConfig, charConfig } from "./chars";
import { FC } from "react";

export const parseValue = (value: number) => 
  [...value.toString()].map(
    char => toIcon(char as CharType)
  )

const toIcon = (char: CharType) => {
    const id = v4();
    const config = charConfig[char];

    const item = {
      id,
      char,
      ...config,
      fill: `${config.icon}-fill`,
      outline: `${config.icon}-outline`,
    }

    switch (char) {
      case '+':
      case '-':
        return {
          ...item,
          Component: Sign,
          sign: true
        };
      case '0':
        return {
          ...item,
          outline: 'num0-outline_alt',
          Component: Char,
          sign: false
        }
      default:
        return {
          ...item,
          Component: Char,
          sign: false
        }
    }
  }
