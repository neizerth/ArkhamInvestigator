import { withOrientation } from "./withOrientation";

type PageProps = {
	title: string;
};

const Portrait = (_props: PageProps) => null;
const Landscape = (_props: PageProps) => null;
const Empty = () => null;

export const Oriented = withOrientation({
	PortraitComponent: Portrait,
	LandscapeComponent: Landscape,
});

export const OrientedEmpty = withOrientation({
	PortraitComponent: Empty,
	LandscapeComponent: Empty,
});

export const Usage = () => (
	<>
		<Oriented title="chaos bag" />
		<OrientedEmpty />
	</>
);
