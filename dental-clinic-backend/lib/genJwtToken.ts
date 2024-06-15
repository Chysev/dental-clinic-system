import jwt, { JwtPayload } from "jsonwebtoken";

const AccessToken = (account: JwtPayload) => {
  const payload = {
    id: account.id,
    email: account.email,
    contact: account.contact,
    user: {
      name: account.user.name,
      role: account.user.role,
      avatarUrl: account.user.avatarUrl,
    },
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
};

const refreshAccessToken = (account: JwtPayload) => {
  const payload = {
    id: account.id,
    email: account.email,
    contact: account.contact,
    user: {
      name: account.user.name,
      role: account.user.role,
      avatarUrl: account.user.avatarUrl,
    },
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export { AccessToken, refreshAccessToken };
