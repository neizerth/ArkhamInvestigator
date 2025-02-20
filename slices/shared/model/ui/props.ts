import type { BreakpointSize, DeviceBreakpointType, DeviceOrientation, DeviceType } from "../device"
import type { Faction, SkillType } from "../game"

export type PropsWithFaction = {
  faction: Faction
}

export type PropsWithSkill = {
  skillType: SkillType
}

export type PropsWithBreakpoint = {
  breakpoint: DeviceBreakpointType
}