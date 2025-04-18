import { View } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Background: typeof FastImage = styled(FastImage)`
  position: absolute;
  left: 0;
  top: 0;
`;
