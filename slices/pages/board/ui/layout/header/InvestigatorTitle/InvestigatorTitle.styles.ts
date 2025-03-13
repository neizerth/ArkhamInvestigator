import { PropsWithView } from "@pages/board/model";
import { color, font } from "@shared/config";
import { getKeyConfig } from "@shared/lib";
import type { Box, PropsWithFaction } from "@shared/model";
import { mergeDeepRight } from "ramda";
import type { TextStyle, ViewStyle } from "react-native";

type GetTitleStyleOptions = PropsWithView & PropsWithFaction & {
  language?: string
  isParallel?: boolean 
}

type ReturnStyle = {
  container: ViewStyle
  title: ViewStyle
  titleText: TextStyle
  subtitle: ViewStyle
  subtitleText: TextStyle
  unique: TextStyle
  id: TextStyle
}

export const getTitleStyle = (options: GetTitleStyleOptions) => {
  const { 
    view, 
    language, 
    faction,
    isParallel
  } = options;
  const vh = view.height / 100;
  const textColor = isParallel ? color.white : color.text
  
  const getLocaleStyle = getKeyConfig<Partial<ReturnStyle>>({
    default: {
      title: {
      },
      titleText: {
        fontSize: 45 * vh * font.scale,
      },
      subtitleText: {
        fontSize: 22 * vh * font.scale,
      },
      id: {
        fontSize: 30 * vh * font.scale,
      },
      unique: {
        fontSize: 25 * vh * font.scale,
      }
    },
    ru: {
      container: {
        gap: '7%'
      },
      title: {
        paddingTop: '1%',
      },
      titleText: {
        fontSize: 40 * vh * font.scale,
      },
      unique: {
        fontSize: 23 * vh * font.scale,
      }
    },
    ko: {
      container: {
        gap: '12%'
      },
      title: {
        paddingTop: '2%',
      },
      titleText: {
        fontSize: 38 * vh * font.scale,
      },
      subtitleText: {
        fontSize: 18 * vh * font.scale,
      },
      unique: {
        marginTop: 0,
      }
    }
  })

  const getFactiionStyle = getKeyConfig({
    default: {},
    neutral: {
      subtitle: {
        paddingTop: 1
      }
    },
    seeker: {
      subtitle: {
        paddingTop: '0.2%'
      }
    }
  })
  const factionStyle = getFactiionStyle(faction);
  
  const localeStyle = getLocaleStyle(language);

  const container: ViewStyle = {
    gap: '8%'
  }
  const title: ViewStyle = {
    gap: 2 * vh * font.scale,
    paddingTop: '0.5%',
    height: '57.5%'
  }
  const subtitle: ViewStyle = {
    height: '25%',
    paddingTop: '0%'
  }
  const titleText: TextStyle = {
    color: textColor
  }
  const subtitleText: TextStyle = {
    color: textColor
  }

  const unique: TextStyle = {
    marginTop: '1%',
    color: textColor
  }

  const id: TextStyle = {
    color: color.dark10
  }

  const base = {
    container,
    title,
    titleText,
    subtitle,
    subtitleText,
    unique,
    id
  }
  
  return mergeDeepRight(
    mergeDeepRight(base, localeStyle),
    factionStyle
  ) as ReturnStyle;
}