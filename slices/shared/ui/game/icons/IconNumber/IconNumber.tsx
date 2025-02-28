import { Text, type TextProps } from 'react-native';
import { Background, Container, Value } from './IconNumber.components';
import { IconNumberText, type IconNumberTextProps } from '../IconNumberText';
import { scaleFontFromStyle } from '@shared/lib';

export type IconNumberProps = IconNumberTextProps & {
  value: number | string
  backgroundStyle?: TextProps['style'],
  stroke?: boolean
}

export const IconNumber = ({
  backgroundStyle,
  ...props
}: IconNumberProps) => {
  const { 
    stroke, 
    ...valueProps 
  } = props;

  if (!stroke) {
    return <IconNumberText {...props}/>;
  }

  const { scaledFontSize } = scaleFontFromStyle(1.2, props.style);
  
  const style = [
    props.style, 
    { fontSize: scaledFontSize }, 
    backgroundStyle
  ]

  return (
    <Container>
      <Value>
        <IconNumberText {...valueProps}/>
      </Value>
      <Background>
        <IconNumberText
          {...props}
          style={style}
        />
      </Background>
    </Container>
  )
}

