import { skillCheckBreakpoints } from "@pages/skill-check/config";
import { SkillCheckLayoutType } from "@pages/skill-check/model";
import { useWindowDimensions } from "react-native";

export const useSkillCheckLayoutType = (): SkillCheckLayoutType => {
  const window = useWindowDimensions();

  return window.height > skillCheckBreakpoints.medium.height ? 
    'medium' : 'small';
}