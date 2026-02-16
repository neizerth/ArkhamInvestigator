import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { Faction } from "@shared/model";
import type { BaseToastProps, ToastType } from "react-native-toast-message";
import * as C from "./Toast.components";

export type ToastProps = BaseToastProps & {
	type: ToastType;
	props: {
		image1?: string;
		image2?: string;
		faction?: Faction;
		faction2?: Faction;
		token?: ChaosTokenType | null;
	};
};

export const Toast = ({ type, text1, ...restProps }: ToastProps) => {
	const { image1, image2, faction, faction2, token } = restProps.props;

	return (
		<C.Container type={type}>
			<C.Content>
				{image1 && <C.SourceImage source={{ uri: image1 }} faction={faction} />}
				<C.Body>{text1 && <C.Text1 value={text1} />}</C.Body>
				{image2 && (
					<C.SourceImage source={{ uri: image2 }} faction={faction2} />
				)}
				{token && <C.Token type={token} />}
			</C.Content>
		</C.Container>
	);
};
