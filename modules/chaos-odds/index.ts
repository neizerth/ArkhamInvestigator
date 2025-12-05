// Reexport the native module. On web, it will be resolved to ChaosOddsModule.web.ts
// and on native platforms to ChaosOddsModule.ts
export { default } from "./src/ChaosOddsModule";
export * from "./src/ChaosOdds.types";

// Export JSI module (Rust + C++ bindings)
export type { ChaosOddsInput as ChaosTokenInput } from "./src/ChaosOddsJSI";
export { ChaosOddsService as ChaosOdds } from "./src/ChaosOddsService";
