import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
	// searchProducts: async (name = "", price = "", image = "") => {
	// 	try {
	// 	  const res = await fetch("/api/products/search", {
	// 		method: "POST",
	// 		headers: {
	// 		  "Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 		  name, // Search by name (partial match)
	// 		  price, // Search by price (exact or range, depending on backend)
	// 		  image, // Search by image (e.g., URL or filename)
	// 		}),
	// 	  });
	
	// 	  const data = await res.json();
	
	// 	  if (!res.ok || !data.success) {
	// 		return { success: false, message: data.message || "Search failed" };
	// 	  }
	
	// 	  // Update the products state with the search results
	// 	  set({ products: data.data });
	// 	  return { success: true, message: "Search completed successfully" };
	// 	} catch (error) {
	// 	  console.error("Search error:", error);
	// 	  return { success: false, message: "Error searching for products" };
	// 	}
	//   },
}));
