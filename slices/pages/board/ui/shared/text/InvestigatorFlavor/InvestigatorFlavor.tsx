import { color } from "@shared/config"
import { PropsWithUnit } from "@shared/model"
import { FC } from "react"
import { TextProps, Text } from "react-native"
import styled, { css } from "styled-components/native"
import { getInvestigatorFlavorStyles } from "./InvestigatorFlavor.styles"
import { useAppSelector } from "@shared/lib"
import { selectLanguage } from "@features/i18n"

export type InvestigatorFlavorProps = TextProps & Partial<PropsWithUnit>;

export const InvestigatorFlavor = ({
  unit = 0,
  ...props
}: InvestigatorFlavorProps) => {
  const language = useAppSelector(selectLanguage);
  
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
    />
  )
} 