import type { PropsWithFaction } from "@modules/faction/shared/model";
import { getFactionDescriptionStyle } from "@modules/faction/shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";

type ContainerProps = PropsWithFaction & ViewProps;

export const Container: FC<ContainerProps> = styled(View)`
  ${({ faction }: ContainerProps) => getFactionDescriptionStyle(faction)}
  position: absolute;
  z-index: -10;
  opacity: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content: typeof View = styled(View)`
`;
