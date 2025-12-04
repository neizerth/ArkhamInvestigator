import ChaosOdds from "../ChaosOddsJSI";
import type { ChaosTokenInput } from "../ChaosOddsJSI";

/**
 * Подсчитывает количество элементов в массиве жетонов
 * @param tokens - Массив объектов с информацией о жетонах
 * @returns Количество жетонов в массиве
 */
export function countChaosTokens(tokens: ChaosTokenInput[]): number {
	const jsonString = JSON.stringify(tokens);
	return ChaosOdds.count(jsonString);
}
