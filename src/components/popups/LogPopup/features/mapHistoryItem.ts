import { capitalize, uniqId } from "@/features/data/text";
import type { IBoardHistoryItem } from "@/types/board";

export const mapHistoryItem = (item: IBoardHistoryItem) => {
  const type = capitalize(item.type);
  const date = new Date(item.date);
  const icon = getHistoryIcon(item.type);

  return {
    ...item,
    id: uniqId(),
    type,
    date,
    icon
  }
}

export const getHistoryIcon = (type: IBoardHistoryItem['type']) => {

  const isSkill = ['willpower', 'combat', 'intellect', 'agility'].includes(type);
  
  if (isSkill) {
    return `skill_${type}`;
  }

  const isPlural = type[type.length - 1] === 's';

  if (isPlural) {
    return type.slice(0, -1);
  }

  return type;
}