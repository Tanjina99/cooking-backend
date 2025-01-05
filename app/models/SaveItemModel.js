const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemFavoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User reference
  items_type: { type: String, enum: ["blog", "recipe"], required: true }, // Type of the item
  items_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "items_type",
  },
});

const Favorite = mongoose.model("Favorite", ItemFavoriteSchema);

module.exports = { Favorite };
