import jwt from "jsonwebtoken";

export const generateToken = (res, adminId) => {
  const token = jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 60 * 1000,
  });
};
