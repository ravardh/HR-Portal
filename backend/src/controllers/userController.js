import User from "../models/userModel.js";

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const user = await User.findById(userId).select("-password").lean(); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        personalDetails: user.personalDetails,
        emergencyContactDetails: user.emergencyContactDetails,
        educationalDetails: user.educationalDetails,
        employmentDetails: user.employmentDetails,
        familyDetails: user.familyDetails,
        professionalReferences: user.professionalReferences,
        department: user.department,
        designation: user.designation,
        hiringDate: user.hiringDate,
        salary: user.salary,
        status: user.status,
        role: user.role,
        shiftStartTime: user.shiftStartTime,
        shiftEndTime: user.shiftEndTime,
        weekOff: user.weekOff,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    next(error);
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};
