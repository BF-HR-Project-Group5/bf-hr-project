export default function (obj) {
	return Object.fromEntries(Object.entries(obj).filter(([key, val]) => val !== ''));
}
