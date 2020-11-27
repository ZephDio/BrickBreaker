class Account {
  constructor(email, username, password, confirmpassword) {
    this.email = email;
    this.username = username;
    this.setPassword(password, confirmpassword);
  }

  setPassword(password, confirmpassword) {
    if (password === confirmpassword) {
      this.password = password;
    }
  }

  accountCheck() {
    let namelength = this.username.length;
    if (namelength <= 3) {
      return "Username is too short";
    } else if (namelength > 14) {
      return "Username is too long";
    }
    for (const charactere of this.username) {
      if (charactere === " ") {
        return "space inside Username unallowed";
      }
    }
    if (this.password === undefined) {
      return "password not matching";
    }
    return "valid";
  }

  isAccountValid() {
    if (this.accountCheck() === "valid") {
      return true;
    }
    return false;
  }
}

module.exports = Account;
