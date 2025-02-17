import { color } from "@shared/config";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark30};
  flex: 1;
`

// export const Card: typeof View = styled(View)`
//   padding: 20px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `