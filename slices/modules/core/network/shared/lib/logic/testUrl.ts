export const testUrl = async (url: string) => {
	try {
		const response = await fetch(url, { method: "HEAD" });
		const exists =
			response.ok || (response.status >= 300 && response.status < 400);
		console.log("response", response, exists);
		return exists && response;
	} catch (error) {
		return false;
	}
};
