import type { GrayscaleViewProps } from "./Grayscale.types";

export default function GrayscaleView(props: GrayscaleViewProps) {
	return (
		<div>
			<iframe
				style={{ flex: 1 }}
				src={props.url}
				onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
				title="Grayscale"
			/>
		</div>
	);
}
