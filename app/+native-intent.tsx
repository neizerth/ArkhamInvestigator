type RedirectSystemPathProps = {
	path: string;
	initial: boolean;
};

export async function redirectSystemPath({ path }: RedirectSystemPathProps) {
	// block automatic deeplink redirect
	return null;
}
