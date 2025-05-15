import { color } from "@shared/config";
import { ContentPage } from "@widgets/content";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container: typeof ContentPage = styled(ContentPage)`
  background-color: ${color.dark30};
`;

export const List: typeof FlatList = styled(FlatList)`
  
`;
