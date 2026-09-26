import { Row } from "@shared/ui";
import type { FC } from "react";
import type { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	replaceSignature: boolean;
};

export const Container: FC<ContainerProps> = styled(Row)`
  ${({ theme: { size } }) => css`
    align-items: center;
    justify-content: space-between;
    padding: ${size.gap.default}px;
    padding-bottom: 0px;
    gap: ${size.gap.medium}px;
  `}
  ${({ replaceSignature }: ContainerProps) =>
		replaceSignature &&
		css`
      justify-content: flex-end;
    `}
`;
