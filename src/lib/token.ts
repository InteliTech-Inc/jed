import jwt from "jsonwebtoken";

export function generateToken() {
  let token;
  try {
    token = jwt.sign(
      { payload: "payload_example" },
      process.env.NEXT_JUNIPAY_API_KEY as string,
      {
        algorithm: "RS256",
      }
    );
  } catch (err) {
    console.error("Error generating token", err);
    throw err;
  }

  return token;
}
