import { v4 } from "uuid"
import { Char, Sign } from "./IconNumber.components";
import type { CharProps, CharType } from "./IconNumber.types";
import { CharConfig, charConfig } from "./chars";
import { FC } from "react";

export const parseValue = (value: number) => {
  const char = value.toString();

  if (value < 0) {
    const negative = char.slice(0, 2) as CharType;
    const positive = char.slice(2) as CharType;
    return [
      negative,
      positive
    ].map(toIcon);
  }
  return [...value.toString()].map(
    char => toIcon(char as CharType)
  )
}

const charIcons: Record<string, string> = {
  '+': 'plus',
  '-': 'minus'
}

const toIcon = (char: CharType) => {
    const id = v4();
    const common = {
      id,
      char
    }

    if (char.length > 1) {
      const num = char.slice(1);
      const numIcon = `num${num}`;
      return {
        ...common,
        Component: Char,
        sign: false,
        icon: `token_${char}_sealed`,
        fill: `${numIcon}-fill-min`,
        outline: `${numIcon}-outline-min`,
      }
    }
  
    if (char in charIcons) {
      const icon = charIcons[char];

      return {
        ...common,
        icon,
        Component: Sign,
        sign: true,
        fill: `${icon}-fill-min`,
        outline: `${icon}-outline-min`,
      }
    }

    const icon = `num${char}`
    const outline = char === '0' ? 'num0-outline_alt-min' : `${icon}-outline-min`
    return {
      ...common,
      icon,
      Component: Char,
      fill: `${icon}-fill-min`,
      outline,
      sign: false
    }
  }
