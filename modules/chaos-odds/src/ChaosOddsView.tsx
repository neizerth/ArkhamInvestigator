import { requireNativeView } from "expo";
import type * as React from "react";

import type { ChaosOddsViewProps } from "./ChaosOdds.types";

const NativeView: React.ComponentType<ChaosOddsViewProps> =
	requireNativeView("ChaosOdds");

export default function ChaosOddsView(props: ChaosOddsViewProps) {
	return <NativeView {...props} />;
}
