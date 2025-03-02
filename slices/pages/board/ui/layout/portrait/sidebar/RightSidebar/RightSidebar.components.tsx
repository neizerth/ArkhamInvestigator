import { assetsSize } from "@pages/board/config";
import { PropsWithView } from "@pages/board/model";
import { PropsWithUnit } from "@shared/model";
import { FC } from "react";
import { View, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

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
}

export const Container: FC<ViewProps & PropsWithUnit> = styled(View)`
  ${getLayoutStyle}
`