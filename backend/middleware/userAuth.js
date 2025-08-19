import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenDecode.id) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
    // Gán userId vào req.user thay vì req.body
    // Đây là cách làm an toàn và tiêu chuẩn hơn
    req.user = { userId: tokenDecode.id };
    next();
  } catch (error) {
    res.json({ succees: false, message: error.message });
  }
};

export default userAuth;
