import type { PropsWithUnit } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";

const getLayoutStyle = ({ unit }: PropsWithUnit) => {
	if (unit <= 350) {
		return css`
      flex-direction: row;
      align-items: flex-end;
      justify-content: center;
      gap: 20px;
    `;
	}

	const gap = unit < 500 ? 20 : 70;

	return css`
    gap: ${gap}px;
    align-items: center;
    justify-content: flex-end;
    width: ${assetsSize.main}px;
  `;
};

export const Container: FC<ViewProps & PropsWithUnit> = styled(View)`
  ${getLayoutStyle}
  align-items: center;
`;
