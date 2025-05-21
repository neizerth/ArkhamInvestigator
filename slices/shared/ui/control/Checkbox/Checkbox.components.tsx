import { View } from "react-native";
import styled from "styled-components";
import { color, size } from "../../../config";
import { Text } from "../../content";
import { Icon } from "../../game";

export const Container: typeof View = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${size.gap.default}px;
  padding: ${size.gap.small}px 2px;
`;
export const Label: typeof Text = styled(Text)`
  
`;

export const Control: typeof Icon = styled(Icon)`
  color: ${color.dark10};
  font-size: 24px;
  line-height: 24px;
`;
