import { ArkhamDigits } from "@assets/fonts";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { UnscaledText } from "../../../behavior/UnscaledText";
import { Row } from "../../../grid";
import { Icon } from "../Icon/Icon";
import type { CharProps, PropsWithSize } from "./IconNumber.types";

export const Container: typeof View = styled(Row)`
`;

export const CharContainer: typeof View = styled(View)`
  position: relative;
`;

export const StrokeContainer: typeof View = styled(View)`
  position: relative;
`;

export const Fill: typeof UnscaledText = styled(UnscaledText).attrs({
	numberOfLines: 1,
})`
  font-family: ${ArkhamDigits.fill};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;

export const Outline: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${ArkhamDigits.outline};
  position: relative;
  z-index: 3;
`;

export const UnstrokedText: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${ArkhamDigits.fill};
`;

export const Char: FC<CharProps> = styled(Icon).attrs({
	scaleType: false,
})`
  ${({ size }: PropsWithSize) => css`
    letter-spacing: ${size * 0.1}px;
  `}
`;

export const Sign: typeof Char = styled(Char)`
  vertical-align: middle;
  ${({ size }: PropsWithSize) => css`
    font-size: ${size * 0.4}px;
  `}
`;
