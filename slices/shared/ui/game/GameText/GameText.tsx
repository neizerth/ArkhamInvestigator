import { Text, type TextProps } from 'react-native';
import C, { Icon } from './GameText.components';
import { parseText } from './parseText';
import type { PropsWithChildren } from 'react';

type Style = TextProps['style'];
export type GameTextProps = TextProps & {
  value: string
  textStyle?: Style
  iconStyle?: TextProps['style']
}

export const GameText = ({
  value,
  textStyle,
  iconStyle,
  ...props
}: GameTextProps) => {
  const fragments = parseText(value);

  const Fragment = ({ children }: PropsWithChildren) => {
    return (
      <Text 
        {...props} 
        style={[props.style, textStyle]}
      >
        {children}
      </Text>
    )
  }

  return (
    <Fragment>
      {fragments.map((part) => (
        <Fragment key={part.id}>
          {part.type === 'icon' && (
            <Icon 
              {...props}
              style={[props.style, iconStyle]}
              icon={part.value}
              scaleType='maxHeight'
            />
          )}
          {part.type === 'text' && (
            <Fragment>
              {part.value}
            </Fragment>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
}