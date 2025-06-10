import { useCallback, useState } from "react";
import * as C from "./PrimaryButton.components";
import {
	PrimaryButtonProps,
	PrimaryButtonSize,
	PrimaryButtonStyle,
} from "./PrimaryButton.types";

export { PrimaryButtonProps, PrimaryButtonSize, PrimaryButtonStyle };

export const PrimaryButton = ({
	children,
	styleType,
	...props
}: PrimaryButtonProps) => {
	const { size } = props;
	const [loaded, setLoaded] = useState(false);

	const onLoad = useCallback(() => setLoaded(true), []);

	return (
		<C.Container {...props}>
			<C.Background onLoad={onLoad} styleType={styleType} size={size}>
				{loaded && children}
			</C.Background>
		</C.Container>
	);
};
