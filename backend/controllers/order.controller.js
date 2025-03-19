import Order from "../models/order.model.js"; // Adjust the path based on your file structure

// CREATE a new order
export const createOrder = async (req, res) => {
  try {
    const {
      room_number,
      phone_number,
      name,
      arrival_date,
      checkout_date,
      base_rate,
      deposit,
      notes,
    } = req.body;

    const newOrder = new Order({
      room_number,
      phone_number,
      name,
      arrival_date,
      checkout_date,
      base_rate,
      deposit,
      notes,
    });

    await newOrder.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ a single order by id
export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE an existing order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, updates, { new: true });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
