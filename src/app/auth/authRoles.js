/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user', "crew"],
  visitor: ['admin', 'staff', 'user', "crew", 'visitor'],
  guest:['admin', 'staff', 'user', "crew", 'visitor','guest'],
  onlyGuest: [],
};

export default authRoles;
