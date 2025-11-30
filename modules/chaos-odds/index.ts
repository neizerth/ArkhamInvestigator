// Reexport the native module. On web, it will be resolved to ChaosOddsModule.web.ts
// and on native platforms to ChaosOddsModule.ts
export { default } from './src/ChaosOddsModule';
export { default as ChaosOddsView } from './src/ChaosOddsView';
export * from  './src/ChaosOdds.types';
