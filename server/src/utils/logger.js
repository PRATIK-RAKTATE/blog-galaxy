export const logError = (context, error, extra = {}) => {
  console.error(
    JSON.stringify(
      {
        level: "error",
        context,
        message: error.message,
        stack: error.stack,
        ...extra,
      },
      null,
      2
    )
  );
};

export const logInfo = (context, message, extra = {}) => {
  console.log(
    JSON.stringify(
      {
        level: "info",
        context,
        message,
        ...extra,
      },
      null,
      2
    )
  );
};
