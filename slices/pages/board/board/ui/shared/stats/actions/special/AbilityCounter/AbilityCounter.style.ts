const abilityColors: Record<string, string | undefined> = {
	"bounty-contracts": "#8b4a22",
	ravenous: "#3f693f",
};
export const getValueStyle = (abilityId: string) => {
	const color = abilityColors[abilityId];
	return {
		fontSize: 30,
		color,
	};
};
