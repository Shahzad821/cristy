import jwt from "jsonwebtoken";

export default function verifyUser(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Failed to authenticate token",
        success: false,
      });
    }

    req.user = decoded;

    next();
  });
}
