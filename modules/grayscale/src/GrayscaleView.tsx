import { requireNativeView } from "expo";
import type * as React from "react";

import type { GrayscaleViewProps } from "./Grayscale.types";

const NativeView: React.ComponentType<GrayscaleViewProps> =
	requireNativeView("Grayscale");

export default function GrayscaleView(props: GrayscaleViewProps) {
	return <NativeView {...props} />;
}
