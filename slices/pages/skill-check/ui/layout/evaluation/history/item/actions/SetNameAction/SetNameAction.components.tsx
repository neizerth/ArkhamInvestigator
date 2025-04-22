import type { FC } from "react";
import styled from "styled-components/native";
import {
	ExpressionHistoryItemAction as Action,
	type ExpressionHistoryItemActionProps as ActionProps,
} from "../../ExpressionHistoryItemAction";

type ContainerProps = Omit<ActionProps, "icon">;

export const Container: FC<ContainerProps> = styled(Action).attrs({
	icon: "tag",
})`
`;
