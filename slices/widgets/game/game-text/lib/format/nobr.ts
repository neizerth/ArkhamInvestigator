import { nbsp } from "@shared/config";

// changes nbsp to <nobr>
export const nobr = (text: string) => {
	let result = "";
	let token = "";
	let open = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (char === " " && !open) {
			result += `${token} `;
			token = "";
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
				result += `<nobr>${token} </nobr>`;
				token = "";
			}
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

	// console.log(result);

	return result.replace(/(<\/nobr>) /g, " $1");
};
