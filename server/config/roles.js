
const allRoles = {
	user: [], // not really needed?
	employee: [],
	hr: [], //  array of 'roleRights'? if we need them
};

const roles = Object.keys(allRoles); // names of roles
const roleRights = new Map(Object.entries(allRoles)); // map of {role: [roleRights]}

module.exports = {
	roles,
	roleRights,
};