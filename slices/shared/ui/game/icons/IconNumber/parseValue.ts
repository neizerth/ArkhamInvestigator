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
      ...config
    }

    switch (char) {
      case '+':
      case '-':
        return {
          ...item,
          Component: Sign,
          sign: true
        };
      default:
        return {
          ...item,
          Component: Char,
          sign: false
        }
    }
  }
