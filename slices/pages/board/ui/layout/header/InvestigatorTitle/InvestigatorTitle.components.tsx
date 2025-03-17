import { withLocale } from "@features/i18n";
import { Arkhamic } from "@shared/fonts"
import { ArnoPro } from "@shared/fonts"
import { Conkordia } from "@shared/fonts"
import { SanCn } from "@shared/fonts"
import { withIcon } from "@shared/lib/hoc";
import { AppText, Row } from "@shared/ui";
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

export const Id: typeof AppText = styled(AppText)`
  font-family: ${Arkhamic.regular};
` 

export const TitleText: typeof AppText = styled(AppText)`
  
` 


export const Unique = withIcon('unique');

export const Subtitle: typeof View = styled(View)`
  align-items: center;
`

export const SubtitleText: typeof AppText = styled(AppText)`
  
` 
