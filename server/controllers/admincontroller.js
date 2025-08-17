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
//change it to progress values not plan
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
      message: "Member details updated successfully",
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
    // const id = req.params.id;
  const progress = await User.find({}, { progress: 1, _id: 0 });
    // if (!progress) {
    //   return res.status(404).json({
    //     message: "Progress not found",
    //   });
    // }
    // const progress = await progress.find({ userId: id });

    if (!progress || progress.length === 0) {
      return res
        .status(404)
        .json({ message: "No progress" });
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
  try {
    const id = req.params.id;
  const member = await User.findById(id, { progress: 1, _id: 0 });
    if (!member) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member progress fetch successfully",
      data: member
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const insertPlan = async (req, res) => {
  try {
    const {
      planName,
      durationInMonths,
      price,
      description,
      features,
      isActive,
      createdAt,
    } = req.body;

    if (
      !planName ||
      !durationInMonths ||
      !price ||
      !description ||
      !features
    ) {
      return res.status(404).json({
        message: "Every Field is required",
      });
    }
    const newPlan = new Plan({
      planName,
      durationInMonths,
      price,
      description,
      features,
      isActive,
      createdAt,
    });

    await newPlan.save();

    res.status(200).json({
      success: true,
      message: "Plan Insertion successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getPlan = async (req, res) => {
  try {
    const plans = await Plan.find();

    if (!plans || plans.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Plans not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Plan fetched successfully",
      data: plans,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching Plans",
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const id = req.params.id;
    const { planName, durationInMonths, price, description, features } =
      req.body;

    if (!planName && !durationInMonths && !price && !description && !features) {
      return res.status(404).json({
        success: false,
        message: "All are required fields",
      });
    }
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        planName,
        durationInMonths,
        price,
        description,
        features,
      },
      { new: true, runValidators: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updatedPlan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Updation Failed",
    });
  }
};
const deletePlan = async(req,res) =>{
  try{
    const id = req.params.id;
    const plan = await Plan.findByIdAndDelete(id);
    if(!plan){
      return res.status(404).json({
        success:false,
        message:"Plan not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Plan Deleted successfully"
    })
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:"Plan Deletion Failed"
    })
  }
}

const planExpired = async (req, res) => {
  try {
    // Step 1: Get today's date without time for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Step 2: Find members whose expiry date is before today
    const expiredMembers = await Userplan.find({
      endDate: { $lt: today }
    });

    // Step 3: If no expired members found
    if (expiredMembers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No plans have expired yet.",
        data: []
      });
    }

    // Step 4: Return expired members
    res.status(200).json({
      success: true,
      message: "Expired plans found.",
      data: expiredMembers
    });

  } catch (err) {
    console.error("Error checking expired plans:", err);
    res.status(500).json({
      success: false,
      message: "Server error while checking expired plans."
    });
  }
};

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
  deletePlan,
  planExpired
};
