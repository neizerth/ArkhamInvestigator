import { requireNativeView } from 'expo';
import * as React from 'react';

import { GrayscaleViewProps } from './Grayscale.types';

const NativeView: React.ComponentType<GrayscaleViewProps> =
  requireNativeView('Grayscale');

export default function GrayscaleView(props: GrayscaleViewProps) {
  return <NativeView {...props} />;
}
