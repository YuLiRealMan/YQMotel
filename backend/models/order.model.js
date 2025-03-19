import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    room_number: {
      type: Number,
      required: true,
      min: 1,
      max: 17,
    },
    phone_number: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    arrival_date: {
      type: Date,
      required: true,
    },
    checkout_date: {
      type: Date,
      required: true,
    },
    base_rate: {
      type: Number,
      required: true,
      min: 0,
    },
    gst: {
      type: Number,
      required: false,
      min: 0,
    },
    pst: {
      type: Number,
      required: false,
      min: 0,
    },
    accommodation_tax: {
      type: Number,
      required: false,
      min: 0,
    },
    deposit: {
      type: Number,
      required: false,
      min: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
