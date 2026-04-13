import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { cookieOptions } from "../utils/cookieOptions.js";
import { verifyGoogleToken } from "../service/googleAuth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    await Token.create({
      userId: user._id,
      token: refreshToken,
    });

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const accessToken = generateToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    await Token.create({
      userId: user._id,
      token: refreshToken,
    });

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const googleUser = await verifyGoogleToken(idToken);

    let user = await User.find({
      email: googleUser.email,
    });

    if (!user) {
      await User.create({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        avatar: googleUser.avatar,
      });
    }

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await Token.create({
      userId: user._id,
      token: refreshToken,
    });

    res.cookie("refeshToken", refreshToken, cookieOptions);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;

    if (!refreshToken) {
      res.status(401);
      throw new Error("Refresh token missing");
    }

    const tokenDoc = await Token.findOne({
      token: refreshToken,
    });

    if (!tokenDoc) {
      res.status(403);
      throw new Error("Invalid refresh token");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = generateToken(decoded.id);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req,
  res,
  next
) => {
  try {
    const {refreshToken} = req.cookies;

    await Token.deleteOne({
      token:
        refreshToken
    });

    res.clearCookie(
      "refreshToken"
    );

    res.json({
      message: "Logged out"
    });
  } catch (error) {
    next(error);
  }
};
