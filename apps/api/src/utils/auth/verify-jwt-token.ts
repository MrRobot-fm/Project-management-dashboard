import jwt from "jsonwebtoken";

export const verifyJwtToken = ({
  token,
  secretOrPublicKey,
}: {
  token: string;
  secretOrPublicKey: jwt.Secret | jwt.PublicKey;
}) => {
  return jwt.verify(token, secretOrPublicKey) as {
    userId: string;
  };
};
