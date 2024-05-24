class UserResource {
    constructor(user) {
      this.user = user;
    } 

    toJSON() {
      return {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        email_verified_at: this.user.email_verified_at,
        created_at: this.user.created_at,
        updated_at: this.user.updated_at
      };
    }
}
  
module.exports = UserResource;
  