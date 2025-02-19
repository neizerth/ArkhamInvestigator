import { color, font, size } from "@shared/config";
import { getMaxBreakpoint } from "@shared/lib";
import type { DeviceBreakpointType } from "@shared/model/device";
import type { PropsWithBreakpoint } from "@shared/model/ui";
import { IconNumber, Row, SkillIcon } from "@shared/ui";
import type { IconNumberProps, SkillIconProps } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";

type FontSizeRecord = Partial<Record<
  DeviceBreakpointType,
  Record<'value' | 'icon', number>
>>

const fontSize: FontSizeRecord = {
  defaultSmall: {
    value: 10,
    icon: 13
  },
  mobileMedium: {
    value: 13,
    icon: 13
  },
  mobileLarge: {
    value: 16,
    icon: 18
  }
}

const getFontSize = getMaxBreakpoint(fontSize);

export const Container: typeof Row = styled(Row)`
  justify-content: center;
  gap: ${size.gap.small}px;
  background-color: ${color.dark20};
  padding: ${size.gap.small}px;
  padding-top: 8px;
  border-radius: ${size.borderRadius.default}px;
`

export const Value: FC<IconNumberProps & PropsWithBreakpoint> = styled(IconNumber)`
  color: white;
  ${({ breakpoint }: PropsWithBreakpoint) => css`
    font-size: ${getFontSize(breakpoint).value};
  `}
`

export const Icon: FC<SkillIconProps & PropsWithBreakpoint> = styled(SkillIcon)`
  font-size: 13px;
  ${({ breakpoint }: PropsWithBreakpoint) => css`
    font-size: ${getFontSize(breakpoint).icon};
  `}
`