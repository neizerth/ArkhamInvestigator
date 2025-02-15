import { GAP } from "../../config";
import { FlatList, type FlatListProps } from "react-native";
import styled from "styled-components/native";

export const Container: typeof FlatList = styled(FlatList)
  .attrs(({ numColumns = 1 }: FlatListProps<unknown>) => ({
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
