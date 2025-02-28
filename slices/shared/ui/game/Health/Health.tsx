import type { IconImageBackgroundProps } from '@shared/ui/image';
import { health } from './images';
import { Background } from './Health.components';

export type HealthProps = Omit<IconImageBackgroundProps, 'source'>;

export const Health = (props: HealthProps) => {
  return (
    <Background
      {...props}
      source={health}
    />
  );
}