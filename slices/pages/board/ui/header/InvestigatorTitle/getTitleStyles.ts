import { getKeyConfig } from "@shared/lib";
import type { Box } from "@shared/model";
import { mergeDeepRight } from "ramda";
import type { TextStyle, ViewStyle } from "react-native";

type GetTitleStyleOptions = {
  view: Box
  language?: string
}
export const getTitleStyle = (options: GetTitleStyleOptions) => {
  const { view, language } = options;
  const vh = view.height / 100;

  const getLocaleStyle = getKeyConfig({
    default: {
      title: {
        paddingTop: 8 * vh
      },
      titleText: {
        fontSize: 50 * vh,
      }
    }
  })

  const localeStyle = getLocaleStyle(language);

  const container: ViewStyle = {
    gap: 8 * vh
  }
  const title: ViewStyle = {
    gap: 1 * vh,
    height: 60 * vh
  }
  const subtitle: ViewStyle = {
    height: 28 * vh,
    paddingTop: 5 * vh
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
  return mergeDeepRight(base, localeStyle);
}