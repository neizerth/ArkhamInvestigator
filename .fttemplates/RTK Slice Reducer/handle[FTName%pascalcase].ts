import type { <ModelName | pascalcase>Handler } from "@modules/<ModelPath>";

export type <FTName | pascalcase>Payload = {

};

export const handle<FTName | pascalcase>: <ModelName | pascalcase>Handler<
	<FTName | pascalcase>Payload
> = (state, payload) => {
  //
};
