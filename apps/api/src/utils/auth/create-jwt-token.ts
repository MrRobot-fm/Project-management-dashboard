import jwt from "jsonwebtoken";

export const createJwtToken = ({
  userId,
  secretOrPrivateKey,
  options,
}: {
  userId: string;
  secretOrPrivateKey: jwt.Secret | jwt.PrivateKey;
  options?: jwt.SignOptions;
}) => {
  return jwt.sign({ userId }, secretOrPrivateKey, options);
};
