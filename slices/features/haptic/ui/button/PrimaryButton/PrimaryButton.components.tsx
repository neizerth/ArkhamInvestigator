import { buttonImages } from "@assets/images/ui/buttons/primary";
import type { FC } from "react";
import * as ReactNative from "react-native";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "../../TouchableOpacity";
import type {
	PrimaryButtonSize,
	PrimaryButtonStyle,
	PropsWithStyleType,
} from "./PrimaryButton.types";

const buttonWidth: Record<PrimaryButtonStyle, number> = {
	default: 250,
	transparent: 250,
	square: 180,
};

const buttonHeight = 80;

const sizeScale: Record<PrimaryButtonSize, number> = {
	default: 1,
	small: 0.6,
};

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  ${({ size = "default" }: BackgroundProps) => css`
    height: ${buttonHeight * sizeScale[size]}px;
  `}
  justify-content: center;
  align-items: center;
`;

type BackgroundProps = ReactNative.ImageBackgroundProps & PropsWithStyleType;

export const Background: FC<BackgroundProps> = styled(
	ReactNative.ImageBackground,
).attrs(({ styleType = "default" }: BackgroundProps) => ({
	source: buttonImages[styleType],
	resizeMode: "contain",
	resizeMethod: "resize",
}))`
    ${({ styleType = "default", size = "default" }: BackgroundProps) => {
			const scale = sizeScale[size];

			return css`
        width: ${buttonWidth[styleType] * scale}px;
        height: ${buttonHeight * scale}px;
      `;
		}}
    flex: 1;
    justify-content: center;
    align-items: center;
  `;
