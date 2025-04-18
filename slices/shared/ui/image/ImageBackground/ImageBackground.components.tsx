import { Image, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const Background: typeof Image = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
`;
