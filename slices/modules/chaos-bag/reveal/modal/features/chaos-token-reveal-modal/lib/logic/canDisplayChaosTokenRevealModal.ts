const validPathnames = ["/board", "/board/skill-check"];
export const canDisplayChaosTokenRevealModal = (path: string) =>
	validPathnames.includes(path);
