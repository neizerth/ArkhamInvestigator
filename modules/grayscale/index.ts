// Reexport the native module. On web, it will be resolved to GrayscaleModule.web.ts
// and on native platforms to GrayscaleModule.ts
export { default as GrayscaleModule } from "./src/GrayscaleModule";
export type { ToGrayscaleResult } from "./src/Grayscale.types";
