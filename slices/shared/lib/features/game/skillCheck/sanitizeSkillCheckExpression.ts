import { SkillCheckItem } from "@shared/model";
import { last } from "ramda";

export const sanitizeSkillCheckExpression = (data: SkillCheckItem[]) => {
  const lastItem = last(data);
  const validData = lastItem?.type === 'operator' ? 
    data.slice(0, -1) : 
    data;

  return validData;
}