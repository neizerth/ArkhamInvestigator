import { nbsp, shortNbsp } from "../../../../../config";

// changes nbsp to <nobr>
export const nobr = (text: string) => {
	let result = "";
	let token = "";
	let open = false;
	let bracketDepth = 0;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		// Track if we're inside an HTML tag and skip processing
		if (char === "<") {
			// Check if this is a closing tag
			if (text[i + 1] === "/") {
				// We're inside a closing tag, find the matching >
				let j = i;
				let tagContent = "";
				while (j < text.length && text[j] !== ">") {
					tagContent += text[j];
					j++;
				}
				if (j < text.length) {
					tagContent += text[j];
					// Close any open nobr before the tag
					if (open) {
						open = false;
						result += `<nobr>${token}</nobr>`;
						token = "";
					}
					// Add the closing tag to result without processing
					result += tagContent;
					i = j;
					continue;
				}
			} else {
				// Opening tag - find the closing >
				let j = i + 1;
				let tagContent = char;
				while (j < text.length) {
					tagContent += text[j];
					if (text[j] === ">") {
						// Self-closing tag like <img /> or regular opening tag
						// Close any open nobr before the tag
						if (open) {
							open = false;
							result += `<nobr>${token}</nobr>`;
							token = "";
						}
						// Add the tag to result without processing
						result += tagContent;
						i = j;
						break;
					}
					j++;
				}
				if (j >= text.length) {
					// Tag not closed, treat as regular text
					// Fall through to normal processing
				} else {
					continue;
				}
			}
		}

		// Track if we're inside square brackets [...] or [[...]]
		if (char === "[") {
			bracketDepth++;
			// Check if this is a double bracket [[
			const isDoubleBracket = text[i + 1] === "[";
			if (isDoubleBracket) {
				// Add any previous token to result before starting double brackets
				if (!open && token) {
					result += token;
					token = "";
				}
			} else if (!open && token) {
				result += token;
				token = "";
			}
			token += char;
			continue;
		}
		if (char === "]") {
			token += char;
			if (bracketDepth > 0) {
				bracketDepth--;
			}
			// If we just closed double brackets ([[...]]), add to result and reset token
			if (bracketDepth === 0 && token.startsWith("[[")) {
				result += token;
				token = "";
			}
			continue;
		}

		// If inside brackets, just append the character
		if (bracketDepth > 0) {
			token += char;
			continue;
		}

		if ((char === " " || char === "-") && !open) {
			result += `${token}${char}`;
			token = "";
			continue;
		}
		if (char === shortNbsp) {
			if (!open) {
				open = true;
			}
			continue;
		}
		if (char === nbsp) {
			if (!open) {
				open = true;
			}

			token += " ";
			continue;
		}
		if (char === " ") {
			if (open) {
				open = false;
				result += `<nobr>${token}${char}</nobr>`;
				token = "";
			}
			continue;
		}
		if (char === "-" && open) {
			open = false;
			result += `<nobr>${token}${char}</nobr>`;
			token = "";
			continue;
		}
		const nextCloseTag = text.slice(i, i + 2) === "</";
		if (nextCloseTag) {
			if (open) {
				open = false;
				result += `<nobr>${token}</nobr>`;
				token = "";
			}
		}

		token += char;
	}
	result += open ? `<nobr>${token}</nobr>` : token;

	const finalResult = result.replace(/(<\/nobr>) /g, " $1");

	return finalResult;
};
