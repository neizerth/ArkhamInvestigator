import styled from "styled-components/native";
import { View } from "react-native";


export const Container: typeof View = styled(View)`
  position: relative;
`

export const Background: typeof View = styled(View)`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`

export const Value: typeof View = styled(View)`
  position: relative;
  z-index: 2;
`