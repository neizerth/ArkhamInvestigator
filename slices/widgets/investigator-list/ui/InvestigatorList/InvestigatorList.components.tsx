import { GAP } from "../../config";
import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container: typeof FlatList = styled(FlatList)
  .attrs({
    columnWrapperStyle: {
      justifyContent: 'center',
      gap: `${GAP}px`
    },
    contentContainerStyle: {
      gap: `${GAP}px`
    }
  })`
    flex: 1;
    gap: 10px;
  `
