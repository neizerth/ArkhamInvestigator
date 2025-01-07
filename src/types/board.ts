export type IBoard = {
  sanity: number
  health: number
  
  actions: number
  clues: number
  resources: number

  willpower: number
  intellect: number
  combat: number
  agility: number
}

export type IBoardHistoryItem = {
  type: keyof IBoard
  value: number
  oldValue: number
  date: string
}