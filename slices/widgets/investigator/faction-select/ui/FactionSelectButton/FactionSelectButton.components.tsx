import { color, factionColor, size } from "@shared/config"
import { FactionFontIcon, type FactionFontIconProps, TouchableOpacity } from "@shared/ui"
import styled, { css } from "styled-components/native"
import type { FactionSelectButtonProps } from "./FactionSelectButton"
import type { FC } from "react"
import type { PropsWithFaction } from "@shared/model"

export const Button: FC<FactionSelectButtonProps> = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  ${({ selected }: FactionSelectButtonProps) => selected && css`
    background-color: ${color.dark20};
  `}
  ${({ first, selected }: FactionSelectButtonProps) => selected && first && css`
    border-radius: 48px 0 0 48px;
  `}
  ${({ last, selected }: FactionSelectButtonProps) => selected && last && css`
    border-radius: 0 48px 48px 0;
  `}
`

type IconProps = FactionFontIconProps & PropsWithFaction & {
  selected?: boolean
}

export const Icon: FC<IconProps> = styled(FactionFontIcon)`
  color: ${color.light10};
  font-size: 25px;
  ${({ faction, selected }: IconProps) => selected && css`
    color: ${factionColor[faction].darkColor};
  `}
`