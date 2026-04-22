import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import styled from "styled-components/native";
import { color } from "../../../config";

type ContainerProps = ViewProps & {
	navbarHeight: number;
};

export const Container: FC<ContainerProps> = styled(View)`
  background-color: ${color.dark40};
  padding-bottom: ${({ navbarHeight }: ContainerProps) => navbarHeight}px;
  flex: 1;
`;
