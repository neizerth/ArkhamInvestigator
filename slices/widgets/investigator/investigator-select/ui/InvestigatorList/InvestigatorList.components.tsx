import { FlatList } from "react-native";
import type { FlatListProps } from "react-native";
import styled from "styled-components/native";
import { GAP } from "../../config";
import { size } from "@shared/config";

export const Container: typeof FlatList = styled(FlatList)
  .attrs(({ numColumns = 1 }: FlatListProps<unknown>) => ({
    columnWrapperStyle: numColumns > 1 ? {
      justifyContent: 'center',
      gap: GAP
    } : null,
    contentContainerStyle: {
      gap: GAP
    }
  }))`
    gap: ${size.gap.default}px;
    padding: 0 ${size.gap.default}px;
  `