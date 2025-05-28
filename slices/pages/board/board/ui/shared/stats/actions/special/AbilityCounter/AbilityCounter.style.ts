const abilityColors: Record<string, string | undefined> = {
	"bounty-contracts": "#31291e",
	ravenous: "#3f693f",
};
export const getValueStyle = (abilityId: string) => {
	const color = abilityColors[abilityId];
	return {
		fontSize: 30,
		color,
	};
};
