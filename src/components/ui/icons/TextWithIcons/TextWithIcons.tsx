import { Fragment } from 'react';
import S from './TextWithIcons.module.scss';
import { Icon } from '@/components';
import { getLines } from './features/getLines';

export type TextWithIconsProps = {
  value: string;
}

export const TextWithIcons = ({
  value
}: TextWithIconsProps) => {
  const lines = getLines(value);

  const lastLineIndex = lines.length - 1;

  return (
    <>
      {lines.map((parts, index) => (
        <Fragment key={index}>
          {parts.map((part, index) => (
            <Fragment key={index}>
              {part.icon && (
                <span className={S.icon}>
                  <Icon icon={part.icon}/>
                </span>
              )}
              {part.text}
            </Fragment>
          ))}
          {index !== lastLineIndex && <br/>}
        </Fragment>
      ))}
    </>
  )
}