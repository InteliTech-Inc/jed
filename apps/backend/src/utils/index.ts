const STATUS = {
  CREATED: {
    code: 201,
    message: "Successfully Created",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  INVALID_CREDENTIALS: {
    code: 401,
    message: "Invalid Credentials",
  },
  UNAUTHORIZED: {
    code: 403,
    message: "Not Authorized",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
};

function ErrorMessage(code: number, message?: string) {
  switch (code) {
    case STATUS.BAD_REQUEST.code:
      return { message: message || STATUS.BAD_REQUEST.message };

    case STATUS.INVALID_CREDENTIALS.code:
      return { message: message || STATUS.INVALID_CREDENTIALS.message };

    case STATUS.UNAUTHORIZED.code:
      return { message: message || STATUS.UNAUTHORIZED.message };

    case STATUS.NOT_FOUND.code:
      return { message: message || STATUS.NOT_FOUND.message };
    case STATUS.SERVER_ERROR.code:
      return { message: message || STATUS.SERVER_ERROR.message };

    default:
      return { message: message || STATUS.SERVER_ERROR.message };
  }
}

// const allowedOrigins = [
//   "http://localhost:3000",
// ];
// const corsOptions: CorsOptions = {
//   origin: (origin, cb) => {
//     if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
//       return cb(null, true);
//     }
//     cb(new Error("Not allowed by cors"), false);
//   },
// };

// export { corsOptions };

export { STATUS, ErrorMessage };
