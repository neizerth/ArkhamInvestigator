import { color, size } from "@shared/config";
import { Row, type RowProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import type { ModalBackgroundType } from "./Modal.types";

export const Container: typeof View = styled(View)`
  background-color: ${color.modal.background.light};

  justify-content: center;
  align-items: center;
  padding: ${size.gap.large}px;
`;

type ContentProps = RowProps & {
	type: ModalBackgroundType;
};

export const Content: FC<ContentProps> = styled(Row)`
  flex: 1;
  padding: 0px ${size.gap.medium}px;
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
  gap: ${size.gap.medium}px;
  max-height: 85px;

  ${({ type }: ContentProps) =>
		type !== "transparent" &&
		css`
      background-color: ${color.modal.background[type]};
  `}
`;
