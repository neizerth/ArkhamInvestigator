import { nbsp, shortNbsp } from "../../../../../config";

// changes nbsp to <nobr>
export const nobr = (text: string) => {
	let result = "";
	let token = "";
	let open = false;
	let bracketDepth = 0;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		// Track if we're inside square brackets [...] or [[...]]
		if (char === "[") {
			bracketDepth++;
			if (open) {
				open = false;
				result += `<nobr>${token}</nobr>`;
				token = "";
			}
			result += char;
			continue;
		}
		if (char === "]") {
			if (bracketDepth > 0) {
				bracketDepth--;
			}
			result += char;
			continue;
		}

		// If inside brackets, just append the character
		if (bracketDepth > 0) {
			result += char;
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

	return result.replace(/(<\/nobr>) /g, " $1");
};
