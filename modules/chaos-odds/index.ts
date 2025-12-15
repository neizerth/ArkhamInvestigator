import "./src/bootstrap";

export * from "./src/model";

// Export JSI module (Rust + C++ bindings)
export type { ChaosOddsInput } from "./src/lib";
export { ChaosOddsService as ChaosOdds } from "./src/lib";
