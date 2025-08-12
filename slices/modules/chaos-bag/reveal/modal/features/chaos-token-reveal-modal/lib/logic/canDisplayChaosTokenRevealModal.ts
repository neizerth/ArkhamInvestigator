import { routes } from "@shared/config";
import type { Href } from "expo-router";

const validPathnames: Href[] = [
	routes.board,
	routes.skillCheck,
	routes.chaosBag,
];
export const canDisplayChaosTokenRevealModal = (path: Href | string) =>
	validPathnames.includes(path as Href);
