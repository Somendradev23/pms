class ThrowError extends Error {
  constructor(errorName, message) {
    super(message);
    this.name = errorName;
    this.errors = [{ message }];
  }
}

module.exports = ThrowError;
