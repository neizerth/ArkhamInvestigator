import type { ImageProps } from 'react-native';
import * as C from './Loader.components';
import { useLoaderStyle } from './useLoaderStyle';

export type LoaderProps = ImageProps & {
  size?: number;
}

export const Loader = ({
  size = 200,
  ...props
}: LoaderProps) => {
  const style = useLoaderStyle(size);
  return (
    <C.Image
      {...props}
      style={[
        props.style,
        style
      ]}
    />
  );
}