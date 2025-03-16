import styled from "styled-components/native";
import { TouchableOpacity } from "../../behavior/TouchableOpacity";
import { Text as BaseText } from "../../content/typography/Text";
import { color, size } from "@shared/config";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  border-radius: ${size.borderRadius.default}px;
  padding: ${size.gap.default}px;

  background-color: ${color.dark30};
`

export const Text: typeof BaseText = styled(BaseText)`
  
`
