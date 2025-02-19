import { v4 } from "uuid"
import { Char, Sign } from "./IconNumber.components";

export const parseValue = (value: number | string, stroke = false) => 
  [...value.toString()].map(
    char => toIcon(char, stroke)
  )

const toIcon = (char: string, stroke: boolean) => {
    const id = v4();

    if (char === '+') {
      return {
        id,
        Component: Sign,
        icon: 'plus'
      }
    }
    if (char === '-') {
      return {
        id,
        Component: Sign,
        icon: 'minus'
      }
    }

    const icon = stroke ? `num${char}-fill` : `num${char}`;

    return {
      id,
      Component: Char,
      icon
    }
  }
