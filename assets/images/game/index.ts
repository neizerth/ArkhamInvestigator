import description from "./description";
import effects from "./effects";
import faction from "./faction";
import skills from "./skills";
import stats from "./stats";
import title from "./title";

export default [
	...description,
	...faction,
	...skills,
	...title,
	...stats,
	...effects,
];
