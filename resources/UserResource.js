class UserResource {
  
  constructor(user){this.user = user;} 

  toJSON() {
    const {
      UserProfile = {},
      id,
      name,
      email,
      email_verified_at,
      created_at,
      updated_at,
      Profile
    } = this.user;

    const roleDetails = this.user.Roles ? this.user.Roles.map(x => ({
      id: x.id,
      name: x.name,
      label: x.label
    })) : [];

    // For Extract 'name' attribute in Role model
    const roles = this.user.Roles ? this.user.Roles.map(x => x.name) : [];

    // For Extract 'name' attribute in Role model
    const abilities = this.user.Abilities ? this.user.Abilities.map(y => y.name) : [];    
    const abilitiesLabel = this.user.Abilities ? this.user.Abilities.map(y => y.label) : [];
   
    const {
      gender,
      dob: dobSQL,
      mobile_no: mobile,
      is_departmental,
      is_pwd_engineer,
      department_id,
      designation_id,
      display,
      inforce,
      remarks,
      Department,  // Extract the entire Department object
      Designation     
    } = UserProfile;
  
    const department_short_name = Department ? Department.department_short_name : undefined;
    const department_name = Department ? Department.department_name : undefined;
    const deprt_alias_name = Department ? Department.alias_name : undefined;
   
    const designation_name = Designation ? Designation.designation_name : '';
    const designation_alias = Designation ? Designation.designation_alias : '';
    
    const photo = Profile ? Profile.photoUrl : '';
    
    return {
      id,
      name,
      email,
      email_verified_at,
      created_at,
      updated_at,
      roleId: roleDetails,
      roles,
      permissions: abilities,
      permissionLabels: abilitiesLabel,
      gender,
      dobSQL,
      mobile,
      is_departmental,
      is_pwd_engineer,
      department_id,
      designation_id,
      display,
      inforce,
      remarks,
      department_name,
      department_short_name,
      deprt_alias_name,
      designation_name,
      designation_alias,
      photo
    };
  }
}
  
module.exports = UserResource;
