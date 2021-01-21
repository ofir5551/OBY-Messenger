function User (username, password) {
    this.username = username.trim().toLowerCase();
    this.password = password.trim();
}

module.exports = User;