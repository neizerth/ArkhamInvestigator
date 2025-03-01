import { color, size } from "@shared/config";
import { Health as BaseHealth, Sanity as BaseSanity, IconNumber, Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  gap: ${size.gap.small}px;
`

export const Health: typeof BaseHealth = styled(BaseHealth)`
  width: 24px;
  height: 30px;
`

export const Sanity: typeof BaseSanity = styled(BaseSanity)`
  width: 40px;
  height: 30px;
`

export const Value: typeof IconNumber = styled(IconNumber)
  .attrs({
    stroke: true,
    containerStyle: {
      flex: 0
    }
  })`
    font-size: 24px;
    color: white;
  `

export const HealthValue: typeof Value = styled(Value)
  .attrs({
    strokeStyle: {
      color: color.health
    }
    // backgroundStyle: {
    //   color: color.health
    // }
  })`
  
  `

  export const SanityValue: typeof Value = styled(Value)
  .attrs({
    strokeStyle: {
      color: color.sanity
    }
  })`
  
  `