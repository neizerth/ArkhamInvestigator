import { GAP } from "../../config";
import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container: typeof FlatList = styled(FlatList)
  .attrs(({ numColumns }) => ({
    columnWrapperStyle: numColumns > 1 ? {
      justifyContent: 'center',
      gap: `${GAP}px`
    } : null,
    contentContainerStyle: {
      gap: `${GAP}px`
    }
  }))`
    flex: 1;
    gap: 10px;
  `
