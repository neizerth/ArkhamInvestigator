import { TouchableOpacity } from "@modules/haptic/widgets";
import { color, font, size } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 0px ${size.gap.default}px;
  min-width: 48px;
  height: 48px;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  color: ${color.light10};
  font-size: ${font.size.default}px;
`;
