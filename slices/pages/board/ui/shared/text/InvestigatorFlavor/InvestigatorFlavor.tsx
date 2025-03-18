import { color } from "@shared/config"
import type { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { type TextProps, Text } from "react-native"
import styled, { css } from "styled-components/native"
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles"
import { useAppTranslation } from "@features/i18n"
import { UnscaledText } from "@shared/ui"

export type InvestigatorFlavorProps = TextProps & Partial<PropsWithUnit> & {
  value: string
}

export const InvestigatorFlavor = ({
  unit = 0,
  value,
  ...props
}: InvestigatorFlavorProps) => {
  const { translate } = useAppTranslation();
  const [text, language] = translate(value || '');
  
  const style = getInvestigatorFlavorStyles({
    language,
    unit
  });

  return (
    <UnscaledText
      {...props}
      style={[
        props.style,
        style
      ]}
    >
      {text}
    </UnscaledText>
  )
} 