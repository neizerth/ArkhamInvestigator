import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.size.gap.small}px;
  transform: translateY(2px);
`;

const fontSize = 22;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: ${fontSize}px;
  line-height: ${fontSize}px;
`;
