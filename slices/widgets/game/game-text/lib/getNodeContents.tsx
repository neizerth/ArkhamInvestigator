import type React from "react";
import { Fragment } from "react";
import type { TextProps, ViewProps } from "react-native";

import { identity } from "ramda";
import { v4 } from "uuid";
import * as C from "../ui/GameText/GameText.components";
import { haveChineseGlyphs } from "./glyphs";

type Options = {
	children: React.ReactNode[];
	style?: TextProps["style"];
	tokenStyle?: ViewProps["style"];
	props: object;
	breakSentence?: boolean;
};
export function getNodeContents({
	children,
	style,
	props,
	breakSentence,
	tokenStyle,
}: Options) {
	return children.map((child) => {
		if (typeof child !== "string") {
			if (Array.isArray(child)) {
				const children = getNodeContents({
					children: child,
					style,
					props,
					breakSentence,
					tokenStyle,
				});

				return <Fragment key={v4()}>{children}</Fragment>;
			}
			return <Fragment key={v4()}>{child}</Fragment>;
		}

		const tokens = getTokens(child, breakSentence).filter(identity);

		// console.log(tokens)

		return (
			<Fragment key={v4()}>
				{tokens.map((token) => (
					<C.Token key={v4()} style={tokenStyle}>
						<C.Text {...props} style={style}>
							{token}
						</C.Text>
					</C.Token>
				))}
			</Fragment>
		);
	});
}

const getTokens = (text: string, breakSentence = true) => {
	// console.log(text);
	if (haveChineseGlyphs(text)) {
		// keep last 2 symbols on line
		return [...text.slice(0, -2), text.slice(-2)];
	}

	if (!breakSentence) {
		return [text];
	}

	const breakId = "__BREAK__";
	return (
		text
			// .replace(/\xa0/g, breakId)
			.replace(/([ ])/g, ` ${breakId}`)
			.split(breakId)
	);
};
