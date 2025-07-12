import { View } from "react-native";
import styled from "styled-components/native";

export const Modal: typeof View = styled(View)`
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
`;
