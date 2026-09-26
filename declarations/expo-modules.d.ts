declare module "@expo-modules/grayscale" {
	import type { NativeModule } from "expo";

	export type ToGrayscaleResult = {
		base64: string;
	};

	export type GrayscaleModuleEvents = {
		onChange: (params: { value: string }) => void;
	};

	class GrayscaleModuleClass extends NativeModule<GrayscaleModuleEvents> {
		toGrayscale(base64: string): Promise<ToGrayscaleResult>;
	}

	const GrayscaleModule: GrayscaleModuleClass;
	export { GrayscaleModule };
}
