import { color } from "@shared/config";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import type { ModalBackgroundType } from "./Modal.types";

export const Container: typeof View = styled(View)`
  background-color: ${color.modal.background.light};

  justify-content: center;
  align-items: center;
`;

type ContentProps = ViewProps & {
	type: ModalBackgroundType;
};

export const Content: FC<ContentProps> = styled(View)`
  flex: 1;
  justify-content: center;

  ${({ type }: ContentProps) =>
		type !== "transparent" &&
		css`
      background-color: ${color.modal.background[type]};
  `}
`;
