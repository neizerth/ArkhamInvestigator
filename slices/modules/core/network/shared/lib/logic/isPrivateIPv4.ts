/**
 * True for a syntactically valid IPv4 address in a private range (RFC 1918) or loopback.
 *
 * Why: a connecting client's self-reported address (audit/multiplayer.md S5) is otherwise trusted
 * verbatim as the host's own IP when the host has none yet — a malformed value, or one from a
 * different network entirely (VPN, public internet), would poison the invite code/QR the host
 * shows to everyone else.
 */
export const isPrivateIPv4 = (ip: string): boolean => {
	const match = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
	if (!match) {
		return false;
	}

	const octets = match.slice(1).map(Number);
	if (octets.some((octet) => octet < 0 || octet > 255)) {
		return false;
	}

	const [a, b] = octets;

	if (a === 10) return true;
	if (a === 172 && b >= 16 && b <= 31) return true;
	if (a === 192 && b === 168) return true;
	if (a === 127) return true;

	return false;
};
