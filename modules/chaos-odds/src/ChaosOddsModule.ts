import { NativeModule, requireNativeModule } from 'expo';

import { ChaosOddsModuleEvents } from './ChaosOdds.types';

declare class ChaosOddsModule extends NativeModule<ChaosOddsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ChaosOddsModule>('ChaosOdds');
