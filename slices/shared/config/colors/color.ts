import type { SkillType } from "@shared/model"

type SkillColors = {
  dark: string;
  light: string;
}
export const skillColors: Record<SkillType, SkillColors> = {
  willpower: {
    dark: '#217CC8',
    light: '#165385'
  },
  intellect: {
    dark: '#B743A2',
    light: '#7A2D6C'
  },
  combat: {
    dark: '#D3242D',
    light: '#8D181E'
  },
  agility: {
    dark: '#139C1D',
    light: '#0D6813'
  },
  wild: {
    dark: '#217CC8',
    light: '#635120'
  }
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
  health: '#c71f23',
  sanity: '#1c3e6a',
  resource: '#452e26',
  clue: '#486527',
  action: '#24303C',
  text: '#2e2622',
  skill: skillColors
}