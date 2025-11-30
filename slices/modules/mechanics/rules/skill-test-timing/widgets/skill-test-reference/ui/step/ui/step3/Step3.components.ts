import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color } from "@shared/config";
import { Icon, Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
  z-index: 1;
`;

export const Content: typeof Row = styled(Row)`
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const History: typeof View = styled(View)`
  flex: 1;
`;

export const OneMore: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${color.dark10};
  border-radius: 30px;
`;

export const Plus: typeof Icon = styled(Icon)`
  color: ${color.dark10};
`;
