import { buttonImages } from "@assets/images/ui/buttons/primary";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import { ImageBackground, type ImageBackgroundProps } from "../../../image";
import type {
	PrimaryButtonSize,
	PrimaryButtonStyle,
	PropsWithStyleType,
} from "./PrimaryButton.types";

const buttonWidth: Record<PrimaryButtonStyle, number> = {
	default: 250,
	transparent: 250,
	square: 180,
	secondary: 252,
	rounded: 250,
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

type BackgroundProps = ImageBackgroundProps & PropsWithStyleType;

export const Background: FC<BackgroundProps> = styled(ImageBackground).attrs(
	({ styleType = "default" }: BackgroundProps) => ({
		source: buttonImages[styleType],
		contentFit: "contain",
		resizeMethod: "resize",
	}),
)`
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
