
const allRoles = {
	user: [],
	employee: [],
	admin: [], // 
};

const roles = Object.keys(allRoles); // names of roles
const roleRights = new Map(Object.entries(allRoles)); // map of {role: [roleRights]}

module.exports = {
	roles,
	roleRights,
};