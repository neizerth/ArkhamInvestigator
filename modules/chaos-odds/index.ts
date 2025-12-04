// Reexport the native module. On web, it will be resolved to ChaosOddsModule.web.ts
// and on native platforms to ChaosOddsModule.ts
export { default } from "./src/ChaosOddsModule";
export * from "./src/ChaosOdds.types";

// Export JSI module (Rust + C++ bindings)
export { default as ChaosOdds } from "./src/ChaosOddsJSI";
export type { ChaosTokenInput } from "./src/ChaosOddsJSI";

// Вспомогательная функция для подсчета количества жетонов
export { countChaosTokens } from "./src/lib";
