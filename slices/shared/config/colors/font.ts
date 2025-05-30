const scale = 1.25;
const fs = (size: number) => Math.round(size * scale);

export const font = {
	size: {
		xs: fs(10),
		small: fs(12),
		default: fs(14),
		medium: fs(16),
		large: fs(18),
		xl: fs(24),
		xxl: fs(28),
		lead: fs(32),
	},
	scale,
};
