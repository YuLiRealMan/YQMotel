import {
	Box,
	Button,
	Container,
	Heading,
	Input,
	useColorModeValue,
	useToast,
	VStack,
	Select,
	Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useRoomStore } from "../store/room";
  
  const CheckInPage = () => {
	const [booking, setBooking] = useState({
	  checkIn: "",
	  checkOut: "",
	  beds: "1",
	  pet: "no",
	  smoking: "no",
	});
  
	const { searchRooms } = useRoomStore();
	const toast = useToast();
	const [loading, setLoading] = useState(false); // 添加加载状态
  
	const handleSearchRooms = async () => {
	  const { checkIn, checkOut, beds, pet, smoking } = booking;
  
	  // 基本验证
	  if (!checkIn || !checkOut) {
		toast({
		  title: "Missing Information",
		  description: "Please select both check-in and check-out dates.",
		  status: "warning",
		  isClosable: true,
		});
		return;
	  }
  
	  // 验证 checkOut 晚于 checkIn
	  if (new Date(checkOut) <= new Date(checkIn)) {
		toast({
		  title: "Invalid Dates",
		  description: "Check-out date must be after check-in date.",
		  status: "error",
		  isClosable: true,
		});
		return;
	  }
  
	  // 构造搜索参数对象
	  const searchParams = {
		checkIn,
		checkOut,
		beds: parseInt(beds), // 转换为数字
		pet: pet === "yes", // 转换为布尔值
		smoking: smoking === "yes", // 转换为布尔值
	  };
  
	  setLoading(true); // 开始加载
  
	  try {
		await searchRooms(searchParams); // 传递对象给 searchRooms
		toast({
		  title: "Search Complete",
		  description: "Rooms matching your preferences have been found.",
		  status: "success",
		  isClosable: true,
		});
	  } catch (error) {
		console.error("Search error:", error);
		toast({
		  title: "Search Failed",
		  description: "There was an error searching for rooms.",
		  status: "error",
		  isClosable: true,
		});
	  } finally {
		setLoading(false); // 结束加载
	  }
	};
  
	// 更新 booking 状态的辅助函数
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setBooking((prev) => ({
		...prev,
		[name]: value,
	  }));
	};
  
	return (
	  <Container maxW={"container.sm"}>
		<VStack spacing={8}>
		  <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
			Create Booking
		  </Heading>
  
		  <Box
			w={"full"}
			bg={useColorModeValue("white", "gray.800")}
			p={6}
			rounded={"lg"}
			shadow={"md"}
		  >
			<VStack spacing={4} align="stretch">
			  <Box>
				<Text mb={1}>Check-In Date</Text>
				<Input
				  type="date"
				  name="checkIn" // 添加 name 属性
				  value={booking.checkIn}
				  onChange={handleInputChange}
				/>
			  </Box>
  
			  <Box>
				<Text mb={1}>Check-Out Date</Text>
				<Input
				  type="date"
				  name="checkOut" // 添加 name 属性
				  value={booking.checkOut}
				  onChange={handleInputChange}
				/>
			  </Box>
  
			  <Box>
				<Text mb={1}>Number of Beds</Text>
				<Select
				  name="beds" // 添加 name 属性
				  value={booking.beds}
				  onChange={handleInputChange}
				>
				  <option value="1">1 Bed</option>
				  <option value="2">2 Beds</option>
				</Select>
			  </Box>
  
			  <Box>
				<Text mb={1}>Pet Preference</Text>
				<Select
				  name="pet" // 添加 name 属性
				  value={booking.pet}
				  onChange={handleInputChange}
				>
				  <option value="no">No Pets</option>
				  <option value="yes">Pets Allowed</option>
				</Select>
			  </Box>
  
			  <Box>
				<Text mb={1}>Smoking Preference</Text>
				<Select
				  name="smoking" // 添加 name 属性
				  value={booking.smoking}
				  onChange={handleInputChange}
				>
				  <option value="no">Non-Smoking</option>
				  <option value="yes">Smoking Allowed</option>
				</Select>
			  </Box>
  
			  <Button
				colorScheme="blue"
				onClick={handleSearchRooms}
				w="full"
				isLoading={loading} // 添加加载状态
			  >
				Search Room
			  </Button>
			</VStack>
		  </Box>
		</VStack>
	  </Container>
	);
  };
  
  export default CheckInPage;