import type { ImageProps } from 'react-native';
import { Image } from 'react-native';
import { factionImages } from './images';

export type FactionIconProps = ImageProps & {
  faction: string
}

export const FactionIcon = ({
  faction,
  ...props
}: FactionIconProps) => {
  const source = factionImages[faction];

  if (!source) {
    return null;
  }
  
  return (
    <Image 
      resizeMode="contain"
      resizeMethod="resize"
      {...props} 
      source={source}
    />
  );
}