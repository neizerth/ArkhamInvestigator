import type { PropsWithUnit } from "@shared/model";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";
import {
	InvestigatorClues,
	InvestigatorResources,
} from "../../../../../shared";

type PropsWithCompact = {
	compact?: boolean;
	inline?: boolean;
};

type GetLayoutStyleOptions = PropsWithUnit & PropsWithCompact;

const getRowGap = ({
	unit,
	compact = false,
	inline = false,
}: GetLayoutStyleOptions) => {
	if (inline) {
		return 15;
	}

	return unit < 500 ? 20 : compact ? 30 : 50;
};

const getLayoutStyle = (options: GetLayoutStyleOptions) => {
	const { unit } = options;

	if (unit <= 350) {
		return css`
      flex-direction: row;
      align-items: flex-end;
      justify-content: center;
      gap: 20px;
    `;
	}

	const gap = getRowGap(options);

	return css`
    gap: ${gap}px;
    align-items: center;
    justify-content: flex-end;
    width: ${assetsSize.main}px;
  `;
};

export const Container: FC<ViewProps & GetLayoutStyleOptions> = styled(View)`
  ${getLayoutStyle}
  align-items: flex-end;
`;

type SideStatGroup = ViewProps & GetLayoutStyleOptions;

export const SideStatGroup: FC<SideStatGroup> = styled(View)`
  ${(options: SideStatGroup) => css`
    gap: ${getRowGap(options)}px;
    flex-direction: ${options.inline ? "row" : "column"};
    align-items: center;
  `}
`;

export const Clues: typeof InvestigatorClues = styled(InvestigatorClues)`
  
`;

export const Resources: typeof InvestigatorResources = styled(
	InvestigatorResources,
)`
  
`;
