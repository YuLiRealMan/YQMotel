import mongoose from "mongoose";
import Room from "../models/room.model.js";

export const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find({});
		res.status(200).json({ success: true, data: rooms });
	} catch (error) {
		console.log("error in fetching rooms:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const searchRooms = async (req, res) => {
	const { checkIn, checkOut, beds, pet, smoking } = req.body;
	// console.log(req.body);
  
	try {
	  // 基本的查询条件
	  const query = {
		is_available: true, // 房间必须是可用的
		bed_count: beds, // 床位数等于请求的床位数
		is_smoking_friendly: smoking, // 吸烟友好条件
	  };
	//   console.log("THis is pet", pet);
	  // 如果带宠物，要求房间是允许宠物的；如果没带宠物，则不限制
	  if (pet) {
		query.is_pet_friendly = true; // 带宠物时只选择允许宠物的房间
	  }
  
	  // 查询符合条件的房间
	  const rooms = await Room.find(query);
  
	  // 返回符合条件的房间列表
	  res.status(200).json({ success: true, data: rooms });
	} catch (error) {
	  console.log("error in searching rooms:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };

// export const createProduct = async (req, res) => {
// 	const product = req.body; // user will send this data

// 	if (!product.name || !product.price || !product.image) {
// 		return res.status(400).json({ success: false, message: "Please provide all fields" });
// 	}

// 	const newProduct = new Product(product);

// 	try {
// 		await newProduct.save();
// 		res.status(201).json({ success: true, data: newProduct });
// 	} catch (error) {
// 		console.error("Error in Create product:", error.message);
// 		res.status(500).json({ success: false, message: "Server Error" });
// 	}
// };

// export const updateProduct = async (req, res) => {
// 	const { id } = req.params;

// 	const product = req.body;

// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ success: false, message: "Invalid Product Id" });
// 	}

// 	try {
// 		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
// 		res.status(200).json({ success: true, data: updatedProduct });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Server Error" });
// 	}
// };

// export const deleteProduct = async (req, res) => {
// 	const { id } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ success: false, message: "Invalid Product Id" });
// 	}

// 	try {
// 		await Product.findByIdAndDelete(id);
// 		res.status(200).json({ success: true, message: "Product deleted" });
// 	} catch (error) {
// 		console.log("error in deleting product:", error.message);
// 		res.status(500).json({ success: false, message: "Server Error" });
// 	}
// };
