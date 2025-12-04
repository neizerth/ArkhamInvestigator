import { NativeModule, requireNativeModule } from "expo";

import type {
	GrayscaleModuleEvents,
	ToGrayscaleResult,
} from "./Grayscale.types";

declare class GrayscaleModule extends NativeModule<GrayscaleModuleEvents> {
	toGrayscale(base64: string): Promise<ToGrayscaleResult>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<GrayscaleModule>("Grayscale");
