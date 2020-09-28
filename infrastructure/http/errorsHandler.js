const createMessage = (code) => {
  const errorCodeDescriptions = {
    400: "Bad Request. The request lacks the correct parameters",
    404: "The requested endpoint was not found",
    405: "HTTP Method Not Allowed",
  };

  const error = {
    error: true,
    errorCode: code,
    message: errorCodeDescriptions[code],
  };

  return JSON.stringify(error);
};

const handleError = (code, response) => {
  response.writeHead(code, {
    "Content-Type": "application/json;charset=utf-8",
  });

  const message = createMessage(code);
  console.error(message);
  response.end(message);
};

module.exports = errorsHandler = {
  handleError,
};
