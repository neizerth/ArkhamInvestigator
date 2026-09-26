import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Icon } from "../../../game";
import { Row, type RowProps } from "../../../grid";
import { Text } from "../../typography";

type PropsWithColor = {
	color: string;
};

type ContainerProps = ViewProps & PropsWithColor;

export const Container: FC<ContainerProps> = styled(View)`
  border-width: 1px;

  border-radius: ${({ theme }) => theme.size.borderRadius.large}px;
  overflow: hidden;

  ${({ color }: PropsWithColor) => css`
    border-color: ${color};
  `}
`;

type HeaderProps = RowProps & PropsWithColor;

export const Header: FC<HeaderProps> = styled(Row)`
  justify-content: center;
  padding: ${({ theme }) => theme.size.gap.small}px;

  ${({ color }: PropsWithColor) => css`
    background-color: ${color};
  `}
`;

export const Body: typeof View = styled(View)`
  padding: ${({ theme }) => theme.size.gap.default}px;
`;

export const Title: typeof Text = styled(Text)`
  
`;

export const SectionIcon: typeof Icon = styled(Icon)`
  
`;
