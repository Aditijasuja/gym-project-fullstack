import User from "../models/usermodel.js";
// import AppError from "../utils/errorutils.js";

// const cookieOptions = {
//   maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days
//   httpOnly: true,
//   secure: true,
// };
const joinUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "No data enter" });
  }
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {joinUser};