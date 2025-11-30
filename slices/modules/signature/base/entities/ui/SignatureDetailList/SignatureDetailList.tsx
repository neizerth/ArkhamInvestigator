import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import * as C from "./SignatureDetailList.components";

export type SignatureDetailListProps<T> = ViewProps & {
	data: Item<T>[];
	disabled?: string[];
	size: number;
	selectedId?: string | null;
	onChange: (item: Item<T> | null, index?: number) => void;
};

export function SignatureDetailList<T>({
	data,
	disabled,
	size,
	selectedId,
	onChange,
	...props
}: SignatureDetailListProps<T>) {
	const { t } = useTranslation();

	return (
		<C.Container {...props}>
			{data.map((item) => (
				<C.Item key={item.id} onPress={() => onChange(item)}>
					<C.IconContainer>
						<C.PackIcon
							icon={item.icon || "investigator"}
							faction={item.faction}
							selected={selectedId === item.id}
						/>
					</C.IconContainer>
					<C.Title faction={item.faction} selected={selectedId === item.id}>
						{t(item.name)}
					</C.Title>
				</C.Item>
			))}
		</C.Container>
	);
}
