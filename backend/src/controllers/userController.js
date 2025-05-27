import User from "../models/userModel.js";

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        department: user.department,
        position: user.position,
        gender: user.gender,
        profilePic: user.profilePic,
        qualification: user.qualification,
        hiringDate: user.hiringDate,
        salary: user.salary,
      },
    });
  } catch (error) {
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
