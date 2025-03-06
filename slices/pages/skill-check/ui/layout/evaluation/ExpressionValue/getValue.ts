import { InvestigatorBoard, InvestigatorBoardValues, SkillCheckItem } from "@shared/model";
import { operatorMapping } from "./mapping";
import { evaluate } from 'mathjs'; 
import { last } from "ramda";


export type GetValueOptions = {
  data: SkillCheckItem[]
  value: InvestigatorBoardValues
}
export const getValue = ({
  data,
  value
}: GetValueOptions) => {
  const expression = getExpression(data);
  console.log(expression)
  try {
    return evaluate(expression, value);
  }
  catch (error) {
    console.error('Error evaluating expression:', error);
    return 0;
  }
}

const getExpression = (data: SkillCheckItem[]) => {
  const source = data.map(item => {
    if (item.type === 'operator') {
      return operatorMapping[item.operator];
    }
    if (item.type === 'number') {
      return item.value;
    }
    return item.statType;
  }).join('');

  // added auto floor evaluation
  return source.replace(/([+-]?)(([^+-]*)\/\d+)/, '$1floor($2)')  
}