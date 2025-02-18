import { FlatList } from "react-native";
import type { FlatListProps } from "react-native";
import styled from "styled-components/native";
import { GAP } from "../../config";

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
    gap: 10px;
    padding: 0 10px;
  `