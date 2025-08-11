import User from "../models/usermodel.js";

const planUser = async (req, res) => {
  const { name, gender, age, weight, height } = req.body;
  if (!name || !gender || !age || !weight || !height) {
    return res.status(400).json({ message: "No data enter" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found, Login to Choose plan");
    }
    res.status(201).json({
      success: true,
      message: "Plan Selected Successfully",
    });
  } catch (err) {
    console.log("Error ", err);
    return res.status(400).json({ message: "Error occur" });
  }
};

export {planUser};