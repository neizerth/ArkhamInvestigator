declare module "petrovich" {
	export type PetrovichGender = "male" | "female" | "androgynous";

	type PetrovichPersonFirst = {
		gender: PetrovichGender;
		first: string;
		middle?: string;
		last?: string;
	};

	type PetrovichPersonLast = {
		gender: PetrovichGender;
		first?: string;
		middle?: string;
		last: string;
	};

	type PetrovichPersonMiddle = {
		gender: PetrovichGender;
		first?: string;
		middle: string;
		last?: string;
	};

	export type PetrovichCase =
		| "accusative"
		| "dative"
		| "genitive"
		| "instrumental"
		| "nominative"
		| "prepositional";

	export type PetrovichNamePart = "first" | "middle" | "last";

	type PetrovichCallback = (text: string) => string;

	type PetrovichCaseCallbackRecord = Record<PetrovichCase, PetrovichCallback>;

	type PetrovichGenderCallback = Record<
		PetrovichNamePart,
		PetrovichCaseCallbackRecord
	>;

	export default function petrovich<T extends PetrovichPerson>(
		person: T,
		gcase: PetrovichCase,
	): T;

	export const androgynous: PetrovichGenderCallback;
	export const female: PetrovichGenderCallback;
	export const male: PetrovichGenderCallback;

	export function detect_gender(middle: string): PetrovichGender;
}
