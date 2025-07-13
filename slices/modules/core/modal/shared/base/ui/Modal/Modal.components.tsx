import { color } from "@shared/config";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import type { ModalBackgroundType } from "./Modal.types";

type ContainerProps = ViewProps & {
	type: ModalBackgroundType;
};

export const Container: FC<ContainerProps> = styled(View)`
  justify-content: center;
  align-items: center;


  ${({ type }: ContainerProps) =>
		type !== "transparent" &&
		css`
      background-color: ${color.modal.background[type]};
  `}
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  justify-content: center;

`;
