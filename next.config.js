// https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
// eslint-disable-next-line @typescript-eslint/no-var-requires
const intercept = require("intercept-stdout")
intercept((text) => (text.includes("Duplicate atom key") ? "" : text))

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}
