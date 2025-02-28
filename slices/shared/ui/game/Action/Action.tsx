import type { IconImageBackgroundProps } from '@shared/ui/image';
import { action } from './images';
import { Background } from './Action.components';

export type ActionProps = Omit<IconImageBackgroundProps, 'source'>;

export const Action = (props: ActionProps) => {
  return (
    <Background
      {...props}
      source={action}
    />
  );
}