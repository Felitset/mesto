export class UserInfoOperator {
    constructor({name, profession}) {
      this.name = name;
      this.profession = profession;
    };

    getUserInfo() {
      return {name:this.name.textContent,
        profession:this.profession.textContent}
    }

    setUserInfo(item) {
      this.name.textContent = item.name;
      this.profession.textContent = item.profession;
    }

    
}