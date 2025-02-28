import type { IconImageBackgroundProps } from '@shared/ui/image';
import { sanity } from './images';
import { Background } from './Sanity.components';

export type SanityProps = Omit<IconImageBackgroundProps, 'source'>;

export const Sanity = (props: SanityProps) => {
  return (
    <Background
      {...props}
      source={sanity}
    />
  );
}
