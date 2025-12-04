import type { ChaosOddsViewProps } from "./ChaosOdds.types";

export default function ChaosOddsView(props: ChaosOddsViewProps) {
	return (
		<div>
			<iframe
				style={{ flex: 1 }}
				src={props.url}
				onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
				title="Chaos Odds"
			/>
		</div>
	);
}
