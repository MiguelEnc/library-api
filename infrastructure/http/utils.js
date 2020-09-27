const errorCodeDescriptions = {
  404: "The requested endpoint was not found",
  405: "HTTP Method Not Allowed",
};

const createErrorMessage = (code) => {
  const error = {
    error: true,
    errorCode: code,
    message: errorCodeDescriptions[code],
  };

  return JSON.stringify(error);
};

const respondError = (response, code) => {
  const message = createErrorMessage(code);

  response.status = code;
  response.end(message);
};

module.exports = {
  respondError,
};
