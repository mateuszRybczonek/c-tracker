/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "C-tracker",
    short_name: "C-tracker",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: '/images/web-app-icon.png',
        sizes: '600x489',
        type: 'image/png',
      }
    ]
  };
}
