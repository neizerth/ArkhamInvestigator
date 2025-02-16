import { includesBy } from "./criteria";

export const toggleBy = <T>(
  hasItem: (item: T) => boolean,
  item: T, 
  data: T[]
) => includesBy(hasItem, data) ? 
  data.filter(item => !hasItem(item)) :
  [...data, item]