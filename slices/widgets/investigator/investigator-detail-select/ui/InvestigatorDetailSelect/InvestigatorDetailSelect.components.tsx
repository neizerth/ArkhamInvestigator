import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  align-items: center;
`

export const Content: typeof View = styled(View)`
  flex: 1;
  width: 100%;
  max-width: 500px;
  background-color: ${color.dark30};
`


// export const Card: typeof View = styled(View)`
//   padding: 20px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `