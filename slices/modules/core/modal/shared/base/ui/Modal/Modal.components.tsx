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


  ${({ type, theme }) =>
		type !== "transparent" &&
		css`
      background-color: ${theme.color.modal.background[type]};
  `}
`;

export const Content: typeof View = styled(View)`
  justify-content: center;

`;
