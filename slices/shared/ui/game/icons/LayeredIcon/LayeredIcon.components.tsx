import { View } from "react-native";
import styled from "styled-components/native";
import { Icon } from "../Icon";

export const Container: typeof View = styled(View)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Layer: typeof View = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;

  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
  position: absolute;
`;

export const LayerIcon: typeof Icon = styled(Icon)`

`;
