import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    room_number: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 20,
    },
    room_type: {
      type: String,
      required: true,
    },
    bed_count: {
      type: Number,
      required: true,
      enum: [1, 2], // since only 1 or 2 beds allowed
    },
    base_rate: {
      type: Number,
      required: true,
      min: 0,
    },
    is_pet_friendly: {
      type: Boolean,
      default: false,
    },
    is_smoking_friendly: {
      type: Boolean,
      default: false,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
