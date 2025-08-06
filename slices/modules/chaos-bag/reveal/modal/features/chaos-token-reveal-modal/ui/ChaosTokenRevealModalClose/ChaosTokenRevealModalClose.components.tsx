import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const CloseIcon: typeof Icon = styled(Icon)`
  font-size: 24px;
  color: ${color.light10};
`;
