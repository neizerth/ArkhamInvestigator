import { color, size } from "@shared/config";
import { Icon, Text } from "@shared/ui";
import styled from "styled-components";
import { TouchableOpacity } from "../../TouchableOpacity";

export const Container: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: ${size.gap.default}px;
  min-height: 48px;
`;
export const Label: typeof Text = styled(Text)`
  
`;

export const Control: typeof Icon = styled(Icon)`
  color: ${color.dark10};
  font-size: 24px;
`;
