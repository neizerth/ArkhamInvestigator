import { Faction, SkillType } from "../features"
import type { DeviceBreakpointType } from "../features/device"
import type { Box, BoxLayout, ScaledBox } from "./box"

export type PropsWithFaction = {
  faction: Faction
}

export type PropsWithSkill = {
  skillType: SkillType
}

export type PropsWithBreakpoint = {
  breakpoint: DeviceBreakpointType
}

export type PropsWithBox = {
  box: Box
}

export type PropsWithScaledBox = {
  box: ScaledBox
}

export type PropsWithBoxLayout = {
  box: BoxLayout
}

export type PropsWithUnit = {
  unit: number
}

export type PropsWithStroke = {
  stroke?: boolean
  strokeColor?: string
  strokeWidth?: number
}