import { Slider as BaseSlider, type Row, Text } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof Row = styled(View)`
  ${({ theme: { size } }) => css`
  position: relative;
  border-radius: ${size.borderRadius.default}px;
  padding: ${size.gap.default}px ${size.gap.small}px;
  gap: ${size.gap.default}px;
`}`;

export const Slider: typeof BaseSlider = styled(BaseSlider)`
  
`;

export const Label: typeof Text = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.italic};
  font-size: ${({ theme }) => theme.font.size.small}px;
`;
