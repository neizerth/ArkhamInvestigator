import { requireNativeView } from 'expo';
import * as React from 'react';

import { ChaosOddsViewProps } from './ChaosOdds.types';

const NativeView: React.ComponentType<ChaosOddsViewProps> =
  requireNativeView('ChaosOdds');

export default function ChaosOddsView(props: ChaosOddsViewProps) {
  return <NativeView {...props} />;
}
