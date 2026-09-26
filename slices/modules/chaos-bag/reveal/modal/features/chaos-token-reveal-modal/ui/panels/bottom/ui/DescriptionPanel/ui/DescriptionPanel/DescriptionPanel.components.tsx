import { ChaosTokenOption } from "@modules/chaos-bag/base/features/ui";
import { GameText } from "@modules/core/theme/shared/ui";
import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Icon } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	last: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
  ${({ theme: { size } }) => css`
    margin: ${size.gap.default}px -50px 0;
    padding: ${size.gap.default}px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: ${size.borderRadius.default}px;
    align-items: center;
  `}
  ${({ last }: ContainerProps) =>
		!last &&
		css`
      border: 1px solid rgba(212, 175, 55, 0.8);
    `}
`;

export const Content: typeof TouchableOpacity = styled(TouchableOpacity)`
	flex-direction: row;
  align-items: center;
	padding: 0 ${({ theme }) => theme.size.gap.default}px;
`;

export const Effect: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		paragraph: {
			justifyContent: "center",
		},
		icon: {
			lineHeight: 16,
		},
		icon_bullet: {
			marginTop: -17,
		},
	},
})`
  ${({ theme: { font, color } }) => css`
  font-size: ${font.size.small}px;
  color: ${color.light10};
`}`;

type ExpandProps = ViewProps & {
	open?: boolean;
};

export const Expand: FC<ExpandProps> = styled(View)<ExpandProps>`
  justify-content: flex-end;

  ${({ open }: ExpandProps) =>
		open &&
		css`
    transform: rotate(180deg);
  `}
`;

export const ExpandIcon: typeof Icon = styled(Icon)`
  font-size: 11px;
	color: ${({ theme }) => theme.color.light10};
`;

export const Options: typeof View = styled(View)`
	gap: ${({ theme }) => theme.size.gap.small}px;
	width: 100%;
	justify-content: flex-end;
	right: -4px;
`;

export const Option: typeof ChaosTokenOption = styled(ChaosTokenOption).attrs(
	({ theme }) => ({
		labelStyle: {
			color: theme.color.light10,
		},
	}),
)`
  ${({ theme: { font, color } }) => css`
  font-size: ${font.size.small}px;
  color: ${color.light10};
	padding-left: 40px;
`}`;
