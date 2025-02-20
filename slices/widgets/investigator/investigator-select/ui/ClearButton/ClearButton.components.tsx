import { color, size } from "@shared/config";
import { Icon as BaseIcon } from "@shared/ui";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${color.light10};
  justify-content: center;
  align-items: center;
  
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  
`