// Single source of truth for the site's languages.
//
// To add a language: add an entry here, create src/pages/blog_<code>/ with a
// matching .11tydata.js, then add the CloudCannon collection, the
// data_config.locales_<code> entry, and the new code to --locales in
// .cloudcannon/postbuild.

const DEFAULT_LOCALE = "en";

const LOCALES = {
	en: { label: "EN", dateLocale: "en-US", postsDir: "blog", collection: "posts" },
	fr: { label: "FR", dateLocale: "fr-FR", postsDir: "blog_fr", collection: "posts_fr" },
	de: { label: "DE", dateLocale: "de-DE", postsDir: "blog_de", collection: "posts_de" },
};

const LOCALE_CODES = Object.keys(LOCALES);
const TRANSLATED_CODES = LOCALE_CODES.filter((code) => code !== DEFAULT_LOCALE);

// Eleventy only prefixes the non-default locales. The default language's pages
// are built at the root and `rosey build` relocates them under /en/ — emitting
// /en/ here would give us /en/en/.
function localePrefix(code) {
	return code === DEFAULT_LOCALE ? "" : `/${code}`;
}

module.exports = {
	DEFAULT_LOCALE,
	LOCALES,
	LOCALE_CODES,
	TRANSLATED_CODES,
	localePrefix,
};
