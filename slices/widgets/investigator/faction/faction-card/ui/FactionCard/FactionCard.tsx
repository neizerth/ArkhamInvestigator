import type { Nullable } from "@shared/model";
import type { PropsWithFaction } from "@shared/model/ui";
import { memo } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import { useLayoutSize } from "../../../../../../shared/lib/hooks/ui/useLayoutSize";
import * as C from "./FactionCard.components";

export type FactionCardProps = ViewProps &
	PropsWithFaction & {
		title?: string;
		subtitle?: string;
		okText?: string;
		cancelText?: string;
		onClose?: Nullable<() => void>;
		onOk?: Nullable<() => void>;
		onCancel?: Nullable<() => void>;
	};

const MAX_HEIGHT_AREA = 146;

export const FactionCard = ({
	faction,
	title,
	subtitle,
	children,
	onClose,
	onOk,
	onCancel,
	onTouchCancel,
	okText,
	cancelText,
	...props
}: FactionCardProps) => {
	const window = useWindowDimensions();
	const [size, onLayout] = useLayoutSize(window);

	const [containerSize, onContainerLayout] = useLayoutSize();

	const maxHeight = size.height + MAX_HEIGHT_AREA;

	const style = size
		? {
				maxHeight,
			}
		: {};

	const containerStyle = {
		opacity: size && containerSize ? 1 : 0,
	};

	return (
		<C.Container
			{...props}
			style={[style, props.style, containerStyle]}
			onLayout={onContainerLayout}
		>
			<C.Header faction={faction}>
				{containerSize && (
					<C.Background
						faction={faction}
						width={containerSize.width}
						height={55}
					/>
				)}
				<C.HeaderContent>
					<C.Icon faction={faction} />
					<C.HeaderTextContent>
						<C.Title>{title}</C.Title>
						{subtitle && <C.Subtitle>{subtitle}</C.Subtitle>}
					</C.HeaderTextContent>
					{onClose && (
						<C.Close onPress={onClose}>
							<C.CloseIcon />
						</C.Close>
					)}
				</C.HeaderContent>
			</C.Header>
			<C.Body faction={faction}>
				<C.Content>
					<C.ScrollContainer>
						<C.ScrollContent onLayout={onLayout}>{children}</C.ScrollContent>
					</C.ScrollContainer>
					<C.Actions>
						{onCancel && (
							<C.Cancel text={cancelText} icon="dismiss" onPress={onCancel} />
						)}
						{onOk && (
							<C.OK text={okText} faction={faction} icon="check" onPress={onOk}>
								<C.OKBackground
									faction={faction}
									width={containerSize?.width || 300}
									height={55}
								/>
							</C.OK>
						)}
					</C.Actions>
				</C.Content>
			</C.Body>
		</C.Container>
	);
};

export const FactionCardMemo = memo(FactionCard);
