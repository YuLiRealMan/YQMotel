// import { useState } from "react";
// import { Container, VStack, Button, Box, Text, RadioGroup, Radio, Stack, FormControl, FormLabel, Select } from "@chakra-ui/react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const CheckInPage = () => {
//   const [checkInDate, setCheckInDate] = useState(new Date());
//   const [checkOutDate, setCheckOutDate] = useState(new Date());
//   const [bedSelection, setBedSelection] = useState("1");
//   const [petOption, setPetOption] = useState("no");
//   const [smokingOption, setSmokingOption] = useState("no");

//   const handleSubmit = () => {
//     console.log({
//       checkInDate,
//       checkOutDate,
//       bedSelection,
//       petOption,
//       smokingOption,
//     });
//   };

//   return (
//     <Container maxW="container.sm" py={8}>
//       <VStack spacing={6} align="center">
//         <Text fontSize="2xl" fontWeight="bold">Check In</Text>

//         {/* Date Selectors */}
//         <Box w="full">
//           <FormControl>
//             <FormLabel>Check In Date</FormLabel>
//             <DatePicker
//               selected={checkInDate}
//               onChange={(date) => setCheckInDate(date)}
//               dateFormat="MMMM d, yyyy"
//               className="chakra-input"
//               isClearable
//             />
//           </FormControl>
//         </Box>

//         <Box w="full">
//           <FormControl>
//             <FormLabel>Check Out Date</FormLabel>
//             <DatePicker
//               selected={checkOutDate}
//               onChange={(date) => setCheckOutDate(date)}
//               dateFormat="MMMM d, yyyy"
//               className="chakra-input"
//               isClearable
//             />
//           </FormControl>
//         </Box>

//         {/* Bed Selection */}
//         <Box w="full">
//           <FormControl>
//             <FormLabel>Bed Selection</FormLabel>
//             <RadioGroup onChange={setBedSelection} value={bedSelection}>
//               <Stack direction="row">
//                 <Radio value="1">1 Bed</Radio>
//                 <Radio value="2">2 Beds</Radio>
//               </Stack>
//             </RadioGroup>
//           </FormControl>
//         </Box>

//         {/* Pet Option */}
//         <Box w="full">
//           <FormControl>
//             <FormLabel>Pet Option</FormLabel>
//             <RadioGroup onChange={setPetOption} value={petOption}>
//               <Stack direction="row">
//                 <Radio value="yes">Yes</Radio>
//                 <Radio value="no">No</Radio>
//               </Stack>
//             </RadioGroup>
//           </FormControl>
//         </Box>

//         {/* Smoking Option */}
//         <Box w="full">
//           <FormControl>
//             <FormLabel>Smoking Option</FormLabel>
//             <RadioGroup onChange={setSmokingOption} value={smokingOption}>
//               <Stack direction="row">
//                 <Radio value="yes">Yes</Radio>
//                 <Radio value="no">No</Radio>
//               </Stack>
//             </RadioGroup>
//           </FormControl>
//         </Box>

//         {/* Submit Button */}
//         <Button colorScheme="blue" onClick={handleSubmit} size="lg" width="full">
//           Confirm Check In
//         </Button>
//       </VStack>
//     </Container>
//   );
// };

// export default CheckInPage;

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
} from "@chakra-ui/react";
import { useState } from "react";

const CheckInPage = () => {
	const [booking, setBooking] = useState({
		checkIn: "",
		checkOut: "",
		beds: "1",
		pet: "no",
		smoking: "no",
	});
	const toast = useToast();

	const handleCreateBooking = () => {
		// Simulated response, replace with API call if needed
		const success = true;
		const message = "Booking created successfully!";

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			isClosable: true,
		});

		if (success) {
			setBooking({
				checkIn: "",
				checkOut: "",
				beds: "1",
				pet: "no",
				smoking: "no",
			});
		}
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create Booking
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							type='date'
							placeholder='Check-In Date'
							value={booking.checkIn}
							onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
						/>
						<Input
							type='date'
							placeholder='Check-Out Date'
							value={booking.checkOut}
							onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
						/>
						<Select
							value={booking.beds}
							onChange={(e) => setBooking({ ...booking, beds: e.target.value })}
						>
							<option value='1'>1 Bed</option>
							<option value='2'>2 Beds</option>
						</Select>
						<Select
							value={booking.pet}
							onChange={(e) => setBooking({ ...booking, pet: e.target.value })}
						>
							<option value='no'>No Pets</option>
							<option value='yes'>Pets Allowed</option>
						</Select>
						<Select
							value={booking.smoking}
							onChange={(e) => setBooking({ ...booking, smoking: e.target.value })}
						>
							<option value='no'>Non-Smoking</option>
							<option value='yes'>Smoking Allowed</option>
						</Select>

						<Button colorScheme='blue' onClick={handleCreateBooking} w='full'>
							Submit Booking
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CheckInPage;
