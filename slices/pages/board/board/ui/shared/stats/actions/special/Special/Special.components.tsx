import { TouchableOpacity } from "@modules/haptic/shared/ui";
import { color } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  height: 38px;
  width: 38px;
  justify-content: center;
  align-items: center;
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 30px;
  line-height: 30px;
  color: ${color.white};
  text-shadow: 0 0 5px ${color.black};
  width: 32px;
`;

export const Used: typeof BaseIcon = styled(BaseIcon)`
  font-size: 35px;
  line-height: 35px;
  color: ${color.health};
  position: absolute;
`;
