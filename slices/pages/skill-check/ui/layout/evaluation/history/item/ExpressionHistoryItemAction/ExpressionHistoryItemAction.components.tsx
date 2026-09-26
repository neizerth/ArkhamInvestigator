import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Icon as BaseIcon } from "@shared/ui";
import styled, { css } from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 0px ${({ theme }) => theme.size.gap.default}px;
  min-width: 48px;
  height: 48px;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  ${({ theme: { color, font } }) => css`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`}`;
