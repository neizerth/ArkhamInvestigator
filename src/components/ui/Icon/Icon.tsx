import { useAppSelector } from '@/hooks/useAppSelector';
import S from './Icon.module.scss';
import { selectIcons } from '@/store/features/icons/icons';
import { Block } from '@/components';
import { propEq } from 'ramda';

export type IconProps = {
  icon: string;
}

export const Icon = (props: IconProps) => {
  const icons = useAppSelector(selectIcons);
  const icon = icons.find(propEq(props.icon, 'icon'));
  const char = icon && String.fromCharCode(icon.code);

  return (
    <Block className={S.container}>
      {char}
    </Block>
  );
}