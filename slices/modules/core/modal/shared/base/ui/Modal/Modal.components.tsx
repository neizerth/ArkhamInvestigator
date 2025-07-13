import { color, size } from "@shared/config";
import { Row, type RowProps } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.modal.background.light};

  justify-content: center;
  align-items: center;
  padding: ${size.gap.large}px;
`;

type ContentProps = RowProps & {
	dark?: boolean;
};

export const Content: FC<ContentProps> = styled(Row)`
  flex: 1;
  padding: 0px ${size.gap.medium}px;
  background-color: ${color.modal.background.light};
  border-radius: ${size.borderRadius.large}px;
  align-items: center;
  gap: ${size.gap.medium}px;
  max-height: 85px;

  ${({ dark }: ContentProps) =>
		dark &&
		css`
      background-color: ${color.modal.background.dark};
  `}
`;
