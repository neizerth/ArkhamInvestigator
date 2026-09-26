import { GameText } from "@modules/core/theme/shared/ui";
import { Row } from "@shared/ui";
import { Icon as BaseIcon } from "@shared/ui";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  color: ${({ theme }) => theme.color.light10};
`;

export const IconList: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const ListItem: typeof View = styled(View)`
`;

export const IconText: typeof GameText = styled(GameText)`
  ${({ theme: { color, font } }) => css`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`}`;

export const ListTitle: typeof Row = styled(Row)`
  align-items: center;
  gap: ${({ theme }) => theme.size.gap.small}px
`;
