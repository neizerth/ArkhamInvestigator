import { Row } from "@shared/ui";
import styled from "styled-components/native";
import { ExpressionDisplay } from "../../../ExpressionDisplay";
import { ExpressionHistoryItemRightActions } from "../ExpressionHistoryItemRightActions";

export const Container: typeof Row = styled(Row)`
  justify-content: flex-end;
  align-items: stretch;
`;

export const Display: typeof ExpressionDisplay = styled(ExpressionDisplay)`
`;

export const RightActions: typeof ExpressionHistoryItemRightActions = styled(
	ExpressionHistoryItemRightActions,
)`
`;
