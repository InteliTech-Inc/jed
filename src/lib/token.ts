import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export function generateToken() {
  const privateKeyPath = path.resolve(
    process.cwd(),
    "src/junipay_privatekey.key"
  );

  let privateKey;
  try {
    privateKey = fs.readFileSync(privateKeyPath, "utf8");
  } catch (err) {
    throw err;
  }

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
