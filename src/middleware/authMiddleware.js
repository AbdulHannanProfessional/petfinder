const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Incoming token:", token); // ✅ log token

  if (!token) {
    console.log("No token received");
    return res.status(404).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "zubairjwtsecretkey");
    console.log("Decoded token:", decoded); // ✅ log decoded token

    if (!decoded) {
      console.log("Decoded is null/invalid");
      return res.status(404).json({ message: "The given token is not active. Please try again after login!" });
    }

    req.userId = decoded.id;
    console.log("UserId set in req:", req.userId);

    console.log("calling next() → should move to route now");
    next(); // ✅ this should hand over to your /cart route

  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(404).json({ message: "Invalid Token" });
  }
};
module.exports = {protect}