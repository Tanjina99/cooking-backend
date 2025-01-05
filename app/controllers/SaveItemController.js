const status = require("http-status");
const response = require("../utils/response");
const { Favorite } = require("../models/SaveItemModel");

//create a Blog
const saveItem = async (req, res) => {
  try {
    const newSave = new Favorite(req.body);
    const result = await newSave.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New savedItem created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error creating new savedItem",
          error
        )
      );
  }
};

//populate items_id user_id

module.exports = {
  saveItem,
};
