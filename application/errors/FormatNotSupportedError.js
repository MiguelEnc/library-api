module.exports = class FormatNotSupportedError extends Error {
  constructor(title, format) {
    super(`The book ${title} is not available on ${format}.`);
    this.name = "FormatNotSupportedError";
  }
};
