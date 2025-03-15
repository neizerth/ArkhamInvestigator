import type { SkillCheckItem } from "@shared/model"
import type { TouchableOpacityProps } from "@shared/ui"

export type ExpressionDisplayProps = TouchableOpacityProps & PropsWithType & {
  data: SkillCheckItem[]
  value?: number
}

export type ExpressionDisplayType = 'primary' | 'secondary';

export type PropsWithType = {
  type?: ExpressionDisplayType
}