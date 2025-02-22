import type { DeviceBreakpointType } from "../device"
import type { Faction, SkillType } from "../game"
import type { Box } from "./size"

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