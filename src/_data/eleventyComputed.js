const { LOCALE_CODES } = require("../../_11ty_config/locales");

// blog_fr/my-post -> blog/my-post, so a locale page resolves to the same keys
// as its English equivalent.
const localeDirRe = new RegExp(`^([^/]+)_(${LOCALE_CODES.join("|")})(/|$)`);

module.exports = {
	// From filePathStem, not page.url: it ignores the computed permalink and is
	// identical across a template's pagination pages, so /blog/ and /blog/1/
	// share one root instead of minting duplicate keys.
	rosey_root: (data) => {
		if (data.rosey_root_override) return data.rosey_root_override;

		const stem = (data.page && data.page.filePathStem) || "";
		const key = stem
			.replace(/^\/pages\//, "")
			.replace(/^\/+/, "")
			.replace(localeDirRe, "$1$3");

		return key === "" || key === "index" ? "index" : key;
	},
};
