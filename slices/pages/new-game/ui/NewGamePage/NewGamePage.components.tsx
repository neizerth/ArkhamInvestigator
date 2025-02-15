import { color } from "@shared/config";
import { Icon, Title } from "@shared/ui";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  background-color: ${color.dark30};
  flex: 1;
`

export const BackIcon = styled(Icon)
  .attrs({
    icon: "arrow_back"
  })`
    font-size: 14px;
    width: 20px;
    color: white;
  `

export const BackButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  /* padding: 0 10px; */
`

export const Header: typeof Title = styled(Title)`
  flex: 1;
  padding-right: 20px;
`