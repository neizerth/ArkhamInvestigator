import { Copasetic } from "@assets/fonts";
import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { UnscaledText } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`

`;

export const Value: typeof UnscaledText = styled(UnscaledText)`
  font-family: ${Copasetic.regular};
  font-size: 30px;
  color: ${color.dark10};
  text-align: right;

  letter-spacing: 2px;
`;
