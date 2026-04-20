export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
};

export const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 3 * 24 * 60 * 60 * 1000,
};
