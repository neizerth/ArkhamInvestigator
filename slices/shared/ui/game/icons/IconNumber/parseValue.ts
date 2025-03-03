import { v4 } from "uuid"
import { Char, Sign } from "./IconNumber.components";
import type { CharProps, CharType } from "./IconNumber.types";
import { CharConfig, charConfig } from "./chars";
import { FC } from "react";

export const parseValue = (value: number) => 
  [...value.toString()].map(
    char => toIcon(char as CharType)
  )

const charIcons: Record<string, string> = {
  '+': 'plus',
  '-': 'minus'
}

const toIcon = (char: CharType) => {
    const id = v4();
    const icon = char in charIcons ? charIcons[char] : `num${char}`;

    const item = {
      id,
      char,
      icon,
      fill: `${icon}-fill-min`,
      outline: `${icon}-outline-min`,
    }

    switch (char) {
      case '+':
      case '-':
        return {
          ...item,
          icon: charIcons[char],
          Component: Sign,
          sign: true
        };
      case '0':
        return {
          ...item,
          outline: 'num0-outline_alt-min',
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
