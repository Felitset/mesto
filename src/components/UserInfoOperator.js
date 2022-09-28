export class UserInfoOperator {
    constructor({name, profession}, avatarContainer) {
      this.name = name;
      this.profession = profession;
      this.avatarContainer = avatarContainer
    };

    getUserInfo() {
      return {name:this.name.textContent,
        profession:this.profession.textContent}
    }

    setUserInfo(item) {
      this.name.textContent = item.name;
      this.profession.textContent = item.profession;
    }

    setUserAvatar(link){
      this.avatarContainer.src = link
    }
    
}