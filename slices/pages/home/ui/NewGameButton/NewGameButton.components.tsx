import { withLocale } from "@features/i18n";
import { color, font } from "@shared/config";
import { SanCn } from "@shared/fonts/SanCn";
import { Teutonic } from "@shared/fonts/Teutonic";
import { Text as BaseText } from "react-native";
import styled from "styled-components/native";

// export const Text: typeof BaseText = styled(BaseText)`
//   font-family: ${Teutonic.ru};
//   font-size: ${font.size.xxl}px;
//   color: ${color.light10};
// `

export const Text = withLocale({
  style: {
    default: {
      fontFamily: Teutonic.ru,
      fontSize: font.size.xxl,
      color: color.light10
    },
    ko: {
      fontFamily: SanCn.bold
    }
  }
})