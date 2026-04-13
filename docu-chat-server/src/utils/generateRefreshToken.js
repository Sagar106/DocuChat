import jwt from "jsonwebtoken";

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "3d",
  });
};

export default generateRefreshToken;
