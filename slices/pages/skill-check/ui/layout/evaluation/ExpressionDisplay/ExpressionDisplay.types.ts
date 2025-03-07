import type { SkillCheckItem } from "@shared/model"
import type { ViewProps } from "react-native"

export type ExpressionDisplayProps = ViewProps & PropsWithType & {
  data: SkillCheckItem[]
  value?: number
}

export type ExpressionDisplayType = 'primary' | 'secondary';

export type PropsWithType = {
  type?: ExpressionDisplayType
}