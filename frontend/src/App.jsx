import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import HomeOptionPage from "./pages/HomeOptionPage";
import CheckInPage from "./pages/CheckInPage";
import CheckOutPage from "./pages/CheckOutPage";
function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomeOptionPage />} />
				<Route path="/checkin" element={<CheckInPage />} />
				<Route path="/checkout" element={<CheckOutPage />} />
				{/* <Route path='/create' element={<CreatePage />} /> */}
			</Routes>
		</Box>
	);
}

export default App;
