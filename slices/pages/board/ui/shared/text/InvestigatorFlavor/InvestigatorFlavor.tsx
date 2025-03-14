import { color } from "@shared/config"
import { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { TextProps, Text } from "react-native"
import styled, { css } from "styled-components/native"
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles"
import { useAppSelector } from "@shared/lib"
import { selectLanguage, useAppTranslation } from "@features/i18n"

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
    <Text
      {...props}
      style={[
        props.style,
        style
      ]}
    >
      {text}
    </Text>
  )
} 