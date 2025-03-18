import { create } from "zustand";

export const useRoomStore = create((set) => ({
	rooms: [],
	setRooms: (rooms) => set({ rooms }),
	fetchRooms: async () => {
		const res = await fetch("/api/rooms");
		const data = await res.json();
		set({ rooms: data.data });
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
