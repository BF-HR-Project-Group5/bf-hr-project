const caseInsensitiveRegex = (string) => new RegExp(string, 'i');

const objectValuesToRegex = (obj) =>
	Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, caseInsensitiveRegex(val)]));


module.exports = {
	objectValuesToRegex,
	caseInsensitiveRegex,
}