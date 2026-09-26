import type { FC } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import styled, { css } from "styled-components/native";
import { UnscaledText } from "../../behavior/UnscaledText";
import { type DefinedIconProps, Icon } from "../../game";
import { Row } from "../../grid/Row";

export const Item: typeof Row = styled(Row)`
  padding: ${({ theme }) => theme.size.gap.default}px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText: typeof UnscaledText = styled(UnscaledText)`
  
`;

type RightItemProps = ViewProps & {
	visible?: boolean;
};

export const RightItem: FC<RightItemProps> = styled(View)`
  width: 20px;
  height: 20px;
  align-items: center;
    justify-content: center;
  ${({ visible = false }) => css`
    transform: rotate(${visible ? "270deg" : "90deg"});
  `}
`;

export const RightIcon: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "right-arrow",
})`
  font-size: 14px;
  color: ${({ theme }) => theme.color.light10};
`;

export const Container: typeof View = styled(View)`
  
`;
