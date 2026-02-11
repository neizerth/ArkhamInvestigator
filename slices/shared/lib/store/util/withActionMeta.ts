export const withActionMeta =
	<T = void, M = never>(meta: M) =>
	(payload: T) => ({
		payload,
		meta,
	});
