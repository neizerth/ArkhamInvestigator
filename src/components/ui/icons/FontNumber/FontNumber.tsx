import { Block, FontCharacter } from '@/components';
import S from './FontNumber.module.scss';
import { BlockElement, BlockProps } from '../../common/Block/Block';
import classNames from 'classnames';
import { forwardRef } from 'react';
import { Inline } from '../../common/Inline/Inline';
import { isDigit } from '@/features/data/text';

export type FontNumberProps = BlockProps & {
  value: number | string
  stroke?: boolean
}

export const FontNumber = forwardRef<BlockElement, FontNumberProps>(({
  value,
  stroke = false,
  ...props
}: FontNumberProps, ref) => {
  const toIcon = (char: string) => {
    if (char === '+') {
      return 'plus';
    }
    if (char === '-') {
      return 'minus';
    }
    return stroke ? `num${char}-fill` : `num${char}`;
  }

  const icons = [...value.toString()].map(toIcon);

  return (
    <Block
      {...props} 
      className={classNames(
        S.container,
        props.className
      )}
      ref={ref}
    >
      {icons.map((icon, index) => (
        <Inline 
          key={index}
          className={classNames(
            S[icon]
          )}
        >
          <FontCharacter 
            icon={icon}
          />
        </Inline>
      ))}
    </Block>
  );
})