import { View } from "react-native";
import styled from "styled-components/native";
import { size } from "../../../config";
import { Text } from "../../content";
import { logoSize } from "./LoadScreen.config";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// below the logo: the logo itself stays in the center, where the native splash draws it
export const Footer: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: ${logoSize / 2 + size.gap.default}px;
  align-items: center;
  gap: ${size.gap.default}px;
`;

export const NumericProgress: typeof Text = styled(Text)`
`;
