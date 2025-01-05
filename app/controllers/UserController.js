const User = require("../models/UserModel");
const generateToken = require("../utils/token");
const status = require("http-status");
const response = require("../utils/response");

const signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "User created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "An error occured creating a new user",
          error
        )
      );
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //if the user is not found then it return nothing
    if (!user) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(status.status.UNAUTHORIZED)
        .send(
          response.createErrorResponse(
            status.status.UNAUTHORIZED,
            "Crediential is not matched"
          )
        );
    }

    //after matching now create the token
    const token = generateToken(user);

    //to get the cookie
    res.cookie("accessToken", token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "User logged in successfully"
        )
      );
  } catch (error) {}
};

const getAllAuthor = async (req, res) => {
  try {
    const result = await User.find({ role: "author" });
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All author data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error retrieving all author",
          error
        )
      );
  }
};

module.exports = {
  signup,
  signin,
  getAllAuthor,
};
