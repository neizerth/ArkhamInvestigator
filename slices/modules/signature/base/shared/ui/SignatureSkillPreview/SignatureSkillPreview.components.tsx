import { getMaxBreakpoint } from "@modules/core/device/shared/lib";
import type { DeviceBreakpointType } from "@modules/core/device/shared/model";
import type { PropsWithBreakpoint } from "@shared/model/ui";
import { IconNumber, Row, SkillIcon } from "@shared/ui";
import type { IconNumberProps, SkillIconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";

type FontSizeRecord = Partial<
	Record<DeviceBreakpointType, Record<"value" | "icon", number>>
>;

const fontSize: FontSizeRecord = {
	defaultSmall: {
		value: 12,
		icon: 13,
	},
	mobileMedium: {
		value: 12,
		icon: 13,
	},
	mobileLarge: {
		value: 16,
		icon: 18,
	},
};

const getFontSize = getMaxBreakpoint(fontSize);

export const Container: typeof Row = styled(Row)`
  ${({ theme: { size, color } }) => css`
  justify-content: center;
  align-items: center;
  min-width: 30px;
  min-height: 30px;
  gap: ${size.gap.small}px;
  background-color: ${color.dark20};
  padding: 0px ${size.gap.small}px;
  border-radius: ${size.borderRadius.default}px;
`}`;

export const Value: FC<IconNumberProps & PropsWithBreakpoint> = styled(
	IconNumber,
)`
  color: white;
  ${({ breakpoint }: PropsWithBreakpoint) => css`
    font-size: ${getFontSize(breakpoint).value}px;
  `}
`;

type IconProps = Omit<SkillIconProps, "dark"> & PropsWithBreakpoint;

export const Icon: FC<IconProps> = styled(SkillIcon).attrs({
	dark: true,
})`
  ${({ breakpoint }: PropsWithBreakpoint) => css`
    font-size: ${getFontSize(breakpoint).icon}px;
  `}
`;
