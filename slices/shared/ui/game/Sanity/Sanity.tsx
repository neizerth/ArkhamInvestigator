import { IconImageBackground, IconImageBackgroundProps } from '@shared/ui/image';
import { sanity } from './images';

export type SanityProps = Omit<IconImageBackgroundProps, 'source'>;

export const Sanity = (props: SanityProps) => {
  return (
    <IconImageBackground
      {...props}
      source={sanity}
    />
  );
}
