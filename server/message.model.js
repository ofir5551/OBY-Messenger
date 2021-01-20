function Message (sender, receiver, message, subject, creationDate) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.subject = subject;
    this.creationDate = creationDate;
}

module.exports = Message;