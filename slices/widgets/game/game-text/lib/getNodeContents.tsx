import type React from "react";
import { Fragment } from "react";
import type { TextProps } from "react-native";

import { v4 } from "uuid";
import * as C from "../ui/GameText/GameText.components";
import { haveChineseGlyphs } from "./glyphs";

type Options = {
	children: React.ReactNode[];
	style?: TextProps["style"];
	props: object;
};
export function getNodeContents({ children, style, props }: Options) {
	return children.map((child) => {
		if (typeof child !== "string") {
			if (Array.isArray(child)) {
				const children = getNodeContents({
					children: child,
					style,
					props,
				});

				return <Fragment key={v4()}>{children}</Fragment>;
			}
			return <Fragment key={v4()}>{child}</Fragment>;
		}

		const tokens = getTokens(child);

		return (
			<Fragment key={v4()}>
				{tokens.map((token) => (
					<C.Token key={v4()}>
						<C.Text {...props} style={style}>
							{token}
						</C.Text>
					</C.Token>
				))}
			</Fragment>
		);
	});
}

const getTokens = (text: string) => {
	if (haveChineseGlyphs(text)) {
		return [...text.slice(0, -2), text.slice(-2)];
	}
	const breakId = "__BREAK__";
	return text.replace(/([ ])/g, `${breakId}$1`).split(breakId);
};
