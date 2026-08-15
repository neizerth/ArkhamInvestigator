/**
 * Remembers recently applied message ids so a retransmission is acknowledged but not applied twice.
 *
 * Why: the sender retries until it sees an ACK. When the action arrives but the ACK is lost, the
 * retry used to be applied again — silently doubling incremental actions (damage, horror, resources).
 */
export const createMessageIdCache = (limit = 500) => {
	const seen = new Set<string>();
	const order: string[] = [];

	return {
		/** True when the id was already applied. Registers it otherwise. */
		check(messageId: string): boolean {
			if (!messageId) {
				return false;
			}
			if (seen.has(messageId)) {
				return true;
			}
			seen.add(messageId);
			order.push(messageId);
			while (order.length > limit) {
				const oldest = order.shift();
				if (oldest !== undefined) {
					seen.delete(oldest);
				}
			}
			return false;
		},
		clear() {
			seen.clear();
			order.length = 0;
		},
	};
};
