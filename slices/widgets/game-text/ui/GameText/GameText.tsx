import type { TextProps } from 'react-native';
import { prepareText } from '../../lib/prepareText';
import parse from 'html-react-parser';
import { getLibrary } from '../../lib';
import type { ComponentStyleMap } from '../../model';
import { defaultComponentStyles } from './GameText.styles';

export type GameTextProps = TextProps & {
  value: string
  componentStyles?: ComponentStyleMap
}

export const GameText = ({
  value,
  componentStyles = defaultComponentStyles,
  ...props
}: GameTextProps) => {
  const text = prepareText(value)
  
  const library = getLibrary({
    componentStyles: {
      ...defaultComponentStyles,
      ...componentStyles
    },
    props
  });
  return parse(text, {
    library
  })
}