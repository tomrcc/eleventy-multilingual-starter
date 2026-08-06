const { LOCALES, localePrefix } = require("./locales");

const isDevEnv = (process.env.ELEVENTY_ENV || "development") !== "production";

function showDraft(data) {
	return isDevEnv || data.draft !== true;
}

// Shared directory data for every blog tree. src/pages/blog/blog.11tydata.js and
// its blog_fr/blog_de siblings are one-line calls into this.
module.exports = function postData(code) {
	const prefix = localePrefix(code);

	return {
		layout: "layouts/post.html",
		locale: code,
		posts_collection: LOCALES[code].collection,
		// Split-by-directory pages carry their own translated frontmatter, so the
		// head must not be tagged with Rosey keys — a translated value would
		// overwrite it. See partials/seo.html.
		rosey_seo: false,
		hide_locale_switcher: true,
		eleventyComputed: {
			eleventyExcludeFromCollections: (data) =>
				showDraft(data) ? data.eleventyExcludeFromCollections : true,
			permalink: (data) => {
				if (!showDraft(data)) return false;
				if (data.permalink) return data.permalink;
				// fileSlug, not `title | slugify`: every locale's copy of a post must
				// share the English slug, or the locale picker and tag links point at
				// URLs that don't exist.
				return `${prefix}/blog/${data.page.fileSlug}/`;
			},
		},
	};
};
