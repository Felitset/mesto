export class UserInfoOperator {
    constructor({name, job}) {
      this.name = name;
      this.job = job;
    };

    getUserInfo() {
      return {name:this.name.textContent,
              job:this.job.textContent}
    }

    setUserInfo(item) {
      this.name.textContent = item.name;
      this.job.textContent = item.job;
    }
}