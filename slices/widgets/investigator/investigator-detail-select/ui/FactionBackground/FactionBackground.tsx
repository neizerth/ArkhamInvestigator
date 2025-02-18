import type { PropsWithFaction } from '@shared/model/ui';
import { Image } from 'react-native';
import type { ImageProps } from 'react-native';
import { factionPatterns } from './images';

export type FactionBackgroundProps = Omit<ImageProps, 'resizeMode' | 'source' | 'tintColor'> & PropsWithFaction;

export const FactionBackground = ({
  faction,
  ...props
}: FactionBackgroundProps) => {
  const source = factionPatterns[faction];

  // return null;
  if (!source) {
    return null;
  }

  const resizeMode = faction === 'guardian' ? 'stretch' : 'repeat';

  return (
    <Image
      {...props}
      tintColor="white"
      resizeMode={resizeMode}
      source={source}
    />
  );
}