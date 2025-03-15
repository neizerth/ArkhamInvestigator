import { useCallback } from "react"
import { Linking, TouchableOpacity, type TextProps } from "react-native"
import styled from "styled-components/native"
import { Text } from "./Text"

const LinkText: typeof Text = styled(Text)`
  text-decoration: underline;
`

export type AProps = TextProps & {
  href: string
}

export const A = ({
  href,
  children,
  ...props
}: AProps) => {
  const onPress = useCallback(() => {
    Linking.openURL(href);
  }, [href])
  return (
    <LinkText onPress={onPress}>{children}</LinkText>
  )
}