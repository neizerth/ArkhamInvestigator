import type { SkillType } from "@shared/model"

export const skillColors: Record<SkillType, string> = {
  willpower: '#165385',
  intellect: '#7A2D6C',
  combat: '#8D181E',
  agility: '#0D6813',
  wild: '#635120'
}

export const color = {
  black: '#000',
  white: '#fff',
  
  light10: '#D7D3C6',
  light15: '#E6E1D3',
  light20: '#F5F0E1',
  light30: '#FFFBF2',

  dark10: '#656C6F',
  dark15: '#4F5A60',
  dark20: '#475259',
  dark30: '#24303C',

  fight: '#EE4A53',
  evade: '#48B14F',
  taboo: '#9869f5',
  skill: skillColors
}