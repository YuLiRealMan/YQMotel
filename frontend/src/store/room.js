import { create } from "zustand";

export const useRoomStore = create((set) => ({
	rooms: [],
	setRooms: (rooms) => set({ rooms }),
	fetchRooms: async () => {
		const res = await fetch("/api/rooms");
		const data = await res.json();
		set({ rooms: data.data });
	},
	
	//這個就是給後端發送post-http://localhost:5000/api/rooms/search
	//然後後端會給我們 以下這段消息
	/*
	{
    "success": true,
    "data": [
        {
            "_id": "67d9ce13349383ad471e912a",
            "room_number": 3,
            "room_type": "One Double Bed",
            "bed_count": 1,
            "base_rate": 89,
            "is_pet_friendly": true,
            "is_smoking_friendly": false,
            "is_available": true
        }....
	}
	*/
	searchRooms: async (searchParams) => {
		const res = await fetch("/api/rooms", {
		  method: "POST", // 或者 "GET"，取决于后端设计
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(searchParams),
		});
		//我們得到的是一個json數據
		const data = await res.json();
		set({ rooms: data.data }); // 更新 rooms 状态
	  },
	  
	// updateRoom: async (rid, updatedRoom) => {
	// 	const res = await fetch(`/api/rooms/${rid}`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(updatedRoom),
	// 	});
	// 	const data = await res.json();
	// 	if (!data.success) return { success: false, message: data.message };

	// 	set((state) => ({
	// 		rooms: state.rooms.map((room) => (room._id === rid ? data.data : room)),
	// 	}));

	// 	return { success: true, message: data.message };
	// },
}));
