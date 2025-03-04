import { PropsWithView } from "@pages/board/model";
import { font } from "@shared/config";
import { getKeyConfig } from "@shared/lib";
import type { Box, PropsWithFaction } from "@shared/model";
import { mergeDeepRight } from "ramda";
import type { TextStyle, ViewStyle } from "react-native";

type GetTitleStyleOptions = PropsWithView & PropsWithFaction & {
  language?: string
}

type ReturnStyle = {
  container: ViewStyle
  title: ViewStyle
  titleText: TextStyle
  subtitle: ViewStyle
  subtitleText: TextStyle
  unique: TextStyle
}

export const getTitleStyle = (options: GetTitleStyleOptions) => {
  const { view, language, faction } = options;
  const vh = view.height / 100;

  const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
    default: {
      title: {
        paddingTop: '1%'
      },
      titleText: {
        fontSize: 45 * vh * font.scale,
      }
    }
  })

  const getFactiionStyle = getKeyConfig({
    default: {},
    neutral: {
      subtitle: {
        paddingTop: 1
      }
    }
  })
  const factionStyle = getFactiionStyle(faction);
  
  const localeStyle = getLocaleStyle(language);

  const container: ViewStyle = {
    gap: '8%'
  }
  const title: ViewStyle = {
    gap: '0.5%',
    height: '61%'
  }
  const subtitle: ViewStyle = {
    height: '25%',
    paddingTop: '0%'
  }
  const titleText: TextStyle = {
    
  }
  const subtitleText: TextStyle = {
    fontSize: 25 * vh
  }

  const unique: TextStyle = {
    fontSize: 25 * vh
  }

  const base = {
    container,
    title,
    titleText,
    subtitle,
    subtitleText,
    unique
  }
  
  return mergeDeepRight(
    mergeDeepRight(base, localeStyle),
    factionStyle
  ) as ReturnStyle;
}