/**
 * Extract one complete top-level `{ ... }` JSON object from the slice (may start with whitespace).
 * Handles `"` strings and escapes so `{`/`}` inside strings do not affect depth.
 */
function extractLeadingJsonObject(slice: string): {
	json: string;
	rest: string;
} | null {
	let i = 0;
	while (i < slice.length && /\s/.test(slice[i])) {
		i++;
	}
	if (i >= slice.length || slice[i] !== "{") {
		return null;
	}

	let depth = 0;
	let inString = false;
	let escapedInString = false;
	const start = i;

	for (; i < slice.length; i++) {
		const c = slice[i];
		if (escapedInString) {
			escapedInString = false;
			continue;
		}
		if (inString) {
			if (c === "\\") {
				escapedInString = true;
			} else if (c === '"') {
				inString = false;
			}
			continue;
		}
		if (c === '"') {
			inString = true;
			continue;
		}
		if (c === "{") {
			depth++;
		} else if (c === "}") {
			depth--;
			if (depth === 0) {
				return {
					json: slice.slice(start, i + 1),
					rest: slice.slice(i + 1),
				};
			}
		}
	}

	return null;
}

/**
 * Incrementally decode newline-delimited and/or concatenated JSON objects from a TCP byte stream.
 * Ignores {@link pingToken} lines (watchdog). Drops non-JSON noise before the next `{`.
 */
export function consumeTcpJsonBuffer(
	buffer: string,
	pingToken: string,
): { messages: string[]; remainder: string } {
	const messages: string[] = [];
	let s = buffer;

	while (true) {
		s = s.replace(/^\s+/, "");
		if (s.length === 0) {
			return { messages, remainder: "" };
		}

		if (s.startsWith(pingToken)) {
			const nl = s.indexOf("\n");
			if (nl === -1) {
				return { messages, remainder: s };
			}
			s = s.slice(nl + 1);
			continue;
		}

		const braceIdx = s.indexOf("{");
		if (braceIdx === -1) {
			return { messages, remainder: s };
		}
		if (braceIdx > 0) {
			s = s.slice(braceIdx);
		}

		const extracted = extractLeadingJsonObject(s);
		if (extracted === null) {
			return { messages, remainder: s };
		}
		messages.push(extracted.json);
		s = extracted.rest;
	}
}
