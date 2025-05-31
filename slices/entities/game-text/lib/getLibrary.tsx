import { Icon } from "@shared/ui";
import type { HTMLReactParserOptions } from "html-react-parser";
import { omit } from "ramda";
import { Fragment } from "react";
import type { TextProps } from "react-native";
import { v4 } from "uuid";
import { iconMapping } from "../config";
import type { ComponentStyleMap } from "../model";
import * as C from "../ui/GameText/GameText.components";
import { getNodeContents } from "./getNodeContents";

type GetLibraryOptions = {
	componentStyles?: ComponentStyleMap;
	props: TextProps;
};
export const getLibrary = ({
	componentStyles,
	props,
}: GetLibraryOptions): HTMLReactParserOptions["library"] => ({
	cloneElement(...args) {
		return <Fragment />;
	},
	createElement(type, createElementProps, ...children) {
		const componentStyle = componentStyles?.[type];
		const tokenStyle = componentStyles?.[`${type}Token`];

		// @ts-ignore
		const elementProps = omit(["key"], createElementProps);

		const mergedProps = {
			...props,
			...elementProps,
		};

		const mergedStyles = [props.style, componentStyle];

		const textStyle = [props.style, componentStyles?.text];

		if (type === "content") {
			return <Fragment key={v4()}>{children}</Fragment>;
		}

		const textContent = getNodeContents({
			children,
			style: textStyle,
			tokenStyle,
			props,
		});

		if (type === "p") {
			return (
				<C.Paragraph
					key={v4()}
					{...elementProps}
					style={[componentStyles?.paragraph]}
				>
					{textContent}
				</C.Paragraph>
			);
		}

		if (type === "nobr") {
			const textContent = getNodeContents({
				children,
				style: textStyle,
				tokenStyle,
				props,
				breakSentence: false,
			});

			return (
				<C.Word
					key={v4()}
					{...elementProps}
					style={[componentStyles?.word, componentStyles?.nobr]}
				>
					{textContent}
				</C.Word>
			);
		}

		if (type === "icon") {
			if (
				!elementProps ||
				!("icon" in elementProps) ||
				typeof elementProps.icon !== "string"
			) {
				return <C.Text key={v4()} />;
			}
			const { icon } = elementProps;
			const value = iconMapping[icon] || icon;
			const iconStyle = componentStyles?.[`icon_${icon}`];
			const iconTokenStyle = componentStyles?.[`iconToken_${icon}`];

			return (
				<Fragment key={v4()}>
					<C.Token style={[tokenStyle, iconTokenStyle]}>
						<Icon
							{...mergedProps}
							icon={value}
							style={[mergedStyles, iconStyle]}
							scaleType={false}
						/>
					</C.Token>
					{textContent}
				</Fragment>
			);
		}

		const content = getNodeContents({
			children,
			props: mergedProps,
			style: mergedStyles,
		});

		return (
			<C.Word key={v4()} style={componentStyles?.word}>
				{content}
			</C.Word>
		);
	},
	isValidElement: () => true,
});
