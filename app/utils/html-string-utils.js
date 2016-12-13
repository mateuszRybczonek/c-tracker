/**
 * change newline symbol to <br>
 * @param {string} htmlString
 * @returns {string} copy of htmlString with newline replaced with <br> tags
 */
function convertToLineBreaks(htmlString) {
  return htmlString.replace(/\n/g, '<br>');
}

export {
  convertToLineBreaks,
};
