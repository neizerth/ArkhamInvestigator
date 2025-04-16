import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 20px;
  color: ${color.light10};
`;

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: flex-start;
`;
