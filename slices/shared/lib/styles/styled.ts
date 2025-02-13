import _styled from 'styled-components/native'

export const styled = <T>(Component: T) => 
  (strings: TemplateStringsArray, ...values: string[]): T => _styled(Component)`
    ${String.raw({ raw: strings }, ...values) }
  `