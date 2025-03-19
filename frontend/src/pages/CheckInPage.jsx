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
  import { useNavigate } from 'react-router-dom';

  const CheckInPage = () => {
	const [condition, setCondition] = useState({
	  checkIn: "",
	  checkOut: "",
	  beds: "1",
	  pet: "no",
	  smoking: "no",
	});
  
	const { searchRooms } = useRoomStore();
	const toast = useToast();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false); // 添加加载状态 就是個圈轉一下
  
	const handleSearchRooms = async () => {
		//底下的return的頁面會給condition賦值，這裏吧condition的值取出來
	  const { checkIn, checkOut, beds, pet, smoking } = condition;
	  
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
  
	  // 這裏要轉換一下 ,沒賦值的話就説明沒改變
	  const searchParams = {
		checkIn,
		checkOut,
		beds: parseInt(beds), // 转换为数字
		pet: pet === "true",// 转换为布尔值
		smoking: smoking === "true"
	  };
  
	  setLoading(true); // 开始加载, 這裏是個圈轉一下
  
	  try {
		await searchRooms(searchParams); // 传递对象给 searchRooms
		toast({
		  title: "Search Complete",
		  description: "Rooms matching your preferences have been found.",
		  status: "success",
		  isClosable: true,
		});

		navigate('/room'); // 跳转到 /rooms 页面

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
	/*
	這個函數是**處理表單輸入變化（onChange）**用的。每當使用者改變某個輸入框（例如選了 "2 Beds"），這個函數就會更新對應的欄位。
	*/
	const handleInputChange = (e) => {
	  const { name, value } = e.target;
	  setCondition((prev) => ({
		...prev,
		[name]: value,
	  }));
	};
  
	return (
	  <Container maxW={"container.sm"}>
		<VStack spacing={8}>
		  <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
			Fill Conditions
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
				  value={condition.checkIn}
				  onChange={handleInputChange}
				/>
			  </Box>
  
			  <Box>
				<Text mb={1}>Check-Out Date</Text>
				<Input
				  type="date"
				  name="checkOut" // 添加 name 属性
				  value={condition.checkOut}
				  onChange={handleInputChange}
				/>
			  </Box>
  
			  <Box>
				<Text mb={1}>Number of Beds</Text>
				<Select
				  name="beds" // 添加 name 属性
				  value={condition.beds}
				  onChange={handleInputChange}
				>
				  <option value="1">1 Bed</option>
				  <option value="2">2 Beds</option>
				</Select>
			  </Box>
  
			  <Box>
				<Text mb={1}>Pet</Text>
				<Select
				  name="pet" // 添加 name 属性
				  value={condition.pet}
				  onChange={handleInputChange}
				>
				  <option value="false">No</option>
				  <option value="true">Yes</option>
				</Select>
			  </Box>
  
			  <Box>
				<Text mb={1}>Smoking</Text>
				<Select
				  name="smoking" // 添加 name 属性
				  value={condition.smoking}
				  onChange={handleInputChange}
				>
				  <option value="false">No</option>
				  <option value="true">Yes</option>
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