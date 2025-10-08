import { useLayoutSize } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model/ui";
import { Fragment, memo, useEffect, useState } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./FactionCard.components";

export type FactionCardAction = {
	id: string;
	primary?: boolean;
	icon?: string;
	title: string;
	onPress: () => void;
	style?: ViewProps["style"];
};

export type FactionCardProps = ViewProps &
	PropsWithFaction & {
		title: string;
		subtitle?: string;
		actions: FactionCardAction[];
		onClose: () => void;
	};

const MAX_HEIGHT_AREA = 146;

export const FactionCard = ({
	faction,
	title,
	subtitle,
	children,
	actions,
	onClose,
	onTouchCancel,
	...props
}: FactionCardProps) => {
	const window = useWindowDimensions();
	const [size, onLayout] = useLayoutSize(window);

	const [containerSize, onContainerLayout] = useLayoutSize();

	const [maxHeight, setMaxHeight] = useState(size.height + MAX_HEIGHT_AREA);

	useEffect(() => {
		const height = size.height + MAX_HEIGHT_AREA;
		if (height >= maxHeight) {
			return;
		}
		setMaxHeight(size.height + MAX_HEIGHT_AREA);
	}, [size.height, maxHeight]);

	const style = containerSize
		? {
				maxHeight,
			}
		: {};

	const containerStyle = {
		opacity: containerSize ? 1 : 0,
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
						<C.Title value={title} />
						{subtitle && <C.Subtitle value={subtitle} />}
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
						{actions.map((action) => (
							<Fragment key={action.id}>
								{action.primary ? (
									<C.PrimaryAction
										text={action.title}
										faction={faction}
										icon={action.icon}
										onPress={action.onPress}
										style={action.style}
									>
										<C.OKBackground
											faction={faction}
											width={containerSize?.width || 300}
											height={55}
										/>
									</C.PrimaryAction>
								) : (
									<C.Action
										text={action.title}
										icon={action.icon}
										onPress={action.onPress}
										style={action.style}
									/>
								)}
							</Fragment>
						))}
					</C.Actions>
				</C.Content>
			</C.Body>
		</C.Container>
	);
};

export const FactionCardMemo = memo(FactionCard);
