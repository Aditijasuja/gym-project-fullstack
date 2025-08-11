import User from "../models/usermodel.js";
import Plan from "../models/planmodel.js";
import Userplan from "../models/userplanmodel.js";

const getMember = async (req, res) => {
  try {
    const members = await User.find();
    res.status(200).json({
      success: true,
      message: "All Members Fetched Successfully",
      members,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      success: false,
      message: "Internal server failed",
    });
  }
};
const getMemberone = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await User.findById(id);

    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Member fetched successfully",
      member,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//build form for values
const updateMemberone = async (req, res) => {
  try {
    const id = req.params.id;
    const { plan, startDate, endDate, status } = req.body;
    const member = await User.findById(id);
    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }
    member.Userplan = {
      plan,
      startDate,
      endDate,
      status,
    };

    res.status(200).json({
      success: true,
      message: "Member fetched successfully",
      member,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await User.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMemberProgress = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await User.findById(id);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }
    const progress = await progress.find({ userId: id });

    if (!progress || progress.length === 0) {
      return res
        .status(404)
        .json({ message: "No progress found for this member" });
    }

    res.status(200).json({
      success: true,
      message: "Members Progress",
      data: progress,
    });
  } catch (err) {
    console.log("Error fetching member progress ", err);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
};
const getOneMemberProgress = async (req, res) => {
  try{const id = req.params.id;
  const member = await User.findById(id).select(progress);
  if(!member){
    return res.status(404).json({
      message:"User not found"
    })
  }
  res.status(200).json({
    success:true,
    message:"Member progress fetch successfully",
    data: member.progress
  })}
  catch(err){
    console.log("Error ", err);
    res.status(500).json({message:"Internal Server Error"})
  }
};
const insertPlan = async(req, res) =>{
  try{const {planName, durationInMonths, price, description, features, isActive, createdAt} = req.body;

  if(!planName || durationInMonths || !price || !description || ! features || isActive || createdAt)
  {
    return res.status(404).json({
      message:"Every Field is required"
    })
  }
  const newPlan = new Plan({
    planName, durationInMonths, price, description, features, isActive, createdAt
  })

  await newPlan.save();

  res.status(200).json({
    success:true,
    message:"Plan Insertion successfull"
  })}
  catch(err){
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}
export {
  getMember,
  getMemberone,
  updateMemberone,
  deleteMember,
  getMemberProgress,
  getOneMemberProgress,
  insertPlan,
  getPlan, 
  updatePlan,
  deletePlan
};
