import { boardText } from "@pages/board/config";
import { ArnoPro } from "@shared/fonts"
import { SanCn } from "@shared/fonts"
import { Yoon } from "@shared/fonts"
import { getKeyConfig, type KeyConfig } from "@shared/lib";
import type { ComponentStyleMap, GameTextProps } from "@widgets/game-text";
import { TextStyle } from "react-native";

export const localeComponentStyles: KeyConfig<ComponentStyleMap> = {
  default: {
    i: {
      fontFamily: ArnoPro.italic
    },
    b: {
      fontFamily: ArnoPro.bold
    },
    keyword: {
      fontFamily: ArnoPro.boldItalic
    },
    text: {
      fontFamily: ArnoPro.regular
    }
  },
  ko: {
    i: {
      fontFamily: SanCn.medium,
      fontStyle: 'italic'
    },
    b: {
      fontFamily: SanCn.bold
    },
    keyword: {
      fontFamily: SanCn.bold,
      fontStyle: 'italic'
    },
    text: {
      fontFamily: Yoon.D330
    }
  }
}

type GetComponentStylesOptions = {
  language: string
  unit: number
}

export const getInvestigatorTextStyle = ({
  language,
  unit
}: GetComponentStylesOptions) => {
  const iconFontSize = unit * boardText.ratio.icon;
  const fontSize = unit * boardText.ratio.text;
  const getComponents = getKeyConfig({
    default: {
      ...localeComponentStyles.default,
      icon: {
        fontSize: iconFontSize,
      },
      break: {
        height: fontSize * 2.7
      }
    },
    ko: {
      ...localeComponentStyles.ko,
      icon: {
        fontSize: iconFontSize * 0.85
      }
    }
  })

  const componentStyles = getComponents(language) as ComponentStyleMap;

  const getStyle = getKeyConfig<TextStyle>({
    default: {
      fontSize,
      lineHeight: fontSize * 1.15 
    },
    ko: {
      fontSize: fontSize * 0.95
    }
  })

  const style = getStyle(language);

  return {
    componentStyles,
    style
  }
}
