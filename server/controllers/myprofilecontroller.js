import User from "../models/usermodel.js";
import Userplan from "../models/userplanmodel.js";
const myProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (e) {
    return res.status(400).json({ message: "Failed to fetch user data" });
  }
};

const getPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Userplan.findById(userId).populate("plan");

    if (!user || !user.plan) {
      return res.status(404).json({ message: "No plan found for this user." });
    }

    const plan = {
      name: user.plan.name,
      duration: user.plan.duration,
      startDate: user.startDate,
      endDate: user.endDate,
      price: user.plan.price,
      features: user.plan.features,
    };

    res.status(200).json({ success: true, plan });
  } catch (err) {
    console.error("Get plan error:", err);
    res.status(500).json({ message: "Server error." });
  }
};


const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.params.id;
    const updateUser = await User.findOneAndUpdate(userId, { password });
    if (!updateUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Password Successfully Updated",
    });
  } catch (e) {
    console.log("Error ", e);
  }
};

const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Progress fetched successfully",
      progress: user.progress,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress",
    });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { weight, attendence, goal } = req.body;
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { progress: { weight, attendence, goal } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // user.progress = { weight, attendence, goal };

    res.status(200).json({
      success: true,
      message: "Progress Updated Successfully",
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export {
  myProfile,
  getPlan,
  updatePassword,
  getProgress,
  updateProgress,
};
