import { withLocale } from "@features/i18n";
import { Arkhamic } from "@shared/fonts/Arkhamic";
import { ArnoPro } from "@shared/fonts/ArnoPro";
import { Conkordia } from "@shared/fonts/Conkordia";
import { SanCn } from "@shared/fonts/SanCn";
import { withIcon } from "@shared/lib/hoc";
import { Row } from "@shared/ui";
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
  font-family: ${Arkhamic.regular};
` 

export const TitleText: typeof Text = styled(Text)`
  
` 


export const Unique = withIcon('unique');

export const Subtitle: typeof View = styled(View)`
  align-items: center;
`

export const SubtitleText: typeof Text = styled(Text)`
  
` 
