import { Arkhamic } from "@shared/fonts/Arkhamic";
import { ArnoPro } from "@shared/fonts/ArnoPro";
import { Conkordia } from "@shared/fonts/Conkordia";
import { Teutonic } from "@shared/fonts/Teutonic";
import { withIcon, withLocaleFont } from "@shared/lib/hoc";
import { DefinedIconProps, Icon, IconNumber, Row } from "@shared/ui";
import type { FC } from "react";
import type { ImageBackgroundProps, ImageProps } from "react-native";
import { Text } from "react-native";
import { ImageBackground, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: FC<ImageBackgroundProps> = styled(ImageBackground)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`

export const Title: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
` 

export const Id: typeof Text = styled(Text)`
  font-family: ${Teutonic.regular};
` 

export const TitleText = withLocaleFont({
  style: {
    default: {
      fontFamily: Teutonic.regular,
    },
    ru: {
      fontFamily: Conkordia.regular
    }
  }
});

export const Unique = withIcon('unique');

export const Subtitle: typeof View = styled(View)`
  align-items: center;
`

export const SubtitleText = withLocaleFont({
  style: {
    default: {
      fontFamily: ArnoPro.bold
    }
  }
});