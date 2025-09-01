import type { FC } from "react";
import { Dimensions, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";
import {
	InvestigatorClues,
	InvestigatorDoom,
	type InvestigatorDoomProps,
	InvestigatorResources,
} from "../../../../../shared";

const screen = Dimensions.get("screen");

type PropsWithCompact = {
	compact?: boolean;
	inline?: boolean;
};

type GetLayoutStyleOptions = PropsWithCompact;

const getRowGap = ({
	compact = false,
	inline = false,
}: GetLayoutStyleOptions) => {
	if (inline) {
		return 15;
	}

	return screen.height < 640 ? 20 : compact ? 35 : 40;
};

const getLayoutStyle = (options: GetLayoutStyleOptions) => {
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

export const Group: FC<SideStatGroup> = styled(View)`
  ${(options: SideStatGroup) => css`
    gap: ${getRowGap(options)}px;
    flex-direction: ${options.inline ? "row" : "column"};
    align-items: flex-end;
		justify-content: flex-end;
  `}
`;

export const MainGroup: FC<SideStatGroup> = styled(Group)`
  align-items: center;
`;

export const SideGroup: FC<SideStatGroup> = styled(Group)`
  align-items: center;
`;

export const Clues: typeof InvestigatorClues = styled(InvestigatorClues)`
  
`;

export const Resources: typeof InvestigatorResources = styled(
	InvestigatorResources,
)`
  
`;

type DoomProps = InvestigatorDoomProps & {
	inline?: boolean;
};
export const Doom: FC<DoomProps> = styled(InvestigatorDoom)`
	${({ inline }: DoomProps) =>
		inline &&
		css`
		margin-top: 30px;
	`}
`;
