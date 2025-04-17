import { Arkhamic } from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { withIcon } from "@shared/lib/hoc";
import { Row, UnscaledText } from "@shared/ui";
import type { FC } from "react";
import type { ImageBackgroundProps, ImageProps } from "react-native";
import { ImageBackground, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Background: FC<ImageBackgroundProps> = styled(ImageBackground)`
  ${({ width, height }: ImageProps) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Title: typeof Row = styled(Row)`
  align-items: center;
  justify-content: center;
`;

export const Id: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Arkhamic.regular};
`;

export const TitleText: typeof UnscaledText = styled(UnscaledText)`
  
`;

export const Unique = withIcon("unique");

export const Subtitle: typeof View = styled(View)`
  align-items: center;
`;

export const SubtitleText: typeof UnscaledText = styled(UnscaledText)`
  
`;

export const FactionSwitch: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
`;
