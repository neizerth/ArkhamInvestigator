import "./src/bootstrap";

// Reexport the native module. On web, it will be resolved to ChaosOddsModule.web.ts
// and on native platforms to ChaosOddsModule.ts
import { ChaosOddsModule } from "./src/lib";

export default ChaosOddsModule;
export * from "./src/model";

// Export JSI module (Rust + C++ bindings)
export type { ChaosOddsInput } from "./src/lib";
export { ChaosOddsService as ChaosOdds } from "./src/lib";
