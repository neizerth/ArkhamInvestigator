import { IconImageBackground, IconImageBackgroundProps } from '@shared/ui/image';
import { health } from './images';

export type HealthProps = Omit<IconImageBackgroundProps, 'source'>;

export const Health = (props: HealthProps) => {
  return (
    <IconImageBackground
      {...props}
      source={health}
    />
  );
}