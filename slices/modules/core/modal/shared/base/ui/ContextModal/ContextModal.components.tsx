import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { statusBarHeight } from "@shared/config";
import { Icon, Row, Text } from "@shared/ui";
import { ScrollView } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";

import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	navbarHeight: number;
};

export const Container: FC<ContainerProps> = styled(View)`
  justify-content: flex-end;
  filter: drop-shadow(0 0 5px rgb(0, 0, 0, 1));
  ${({ navbarHeight, theme: { size, color } }) => css`
    padding: ${statusBarHeight + size.gap.default}px ${size.gap.default}px ${navbarHeight + size.gap.small}px;
    background-color: ${color.modal.background.light};
  `}
`;

export const Header: typeof View = styled(View)`
  position: relative;
  align-items: center;
  ${({ theme: { color, size } }) => css`
    background-color: ${color.light30};
    border-radius: ${size.borderRadius.default}px ${size.borderRadius.default}px 0 0;
    padding: ${size.gap.small}px;
  `}
`;

export const Title: typeof Text = styled(Text)`
  font-family: ${({ theme }) => theme.fontFamily.Alegreya.medium};
  color: ${({ theme }) => theme.color.text};
`;

export const Content: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		minHeight: 100,
	},
})`
`;

export const Body: typeof View = styled(View)`
  ${({ theme: { color, size } }) => css`
    background-color: ${color.dark20};
    border-radius: 0 0 ${size.borderRadius.default}px ${size.borderRadius.default}px;
    padding: ${size.gap.default}px;
  `}
`;

const buttonStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0px ${({ theme }) => theme.size.gap.default}px;
  justify-content: center;
  align-items: center;
`;

export const Close: typeof TouchableOpacity = styled(TouchableOpacity)`
  ${buttonStyle};
  right: 0;
`;

export const Action: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: 0px 7px;
  justify-content: center;
  align-items: center;
`;

export const Actions: typeof Row = styled(Row)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;
`;

export const ActionIcon: typeof Icon = styled(Icon)`
  color: ${({ theme }) => theme.color.dark10};
  font-size: 16px;
`;
