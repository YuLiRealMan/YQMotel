import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useRoomStore } from "../store/room"; // updated import
import { useState } from "react";

const RoomCard = ({ room }) => {
	const [setUpdatedRoom] = useState(room);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	// const { deleteRoom, updateRoom } = useRoomStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();



	// const handleUpdateRoom = async (rid, updatedRoom) => {
	// 	const { success, message } = await updateRoom(rid, updatedRoom);
	// 	onClose();
	// 	toast({
	// 		title: success ? "Success" : "Error",
	// 		description: success ? "Room updated successfully" : message,
	// 		status: success ? "success" : "error",
	// 		duration: 3000,
	// 		isClosable: true,
	// 	});
	// };

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			p={4}
		>
			<Heading as='h3' size='md' mb={2}>
				Room #{room.room_number}
			</Heading>

			<Text color={textColor}>Type: {room.room_type}</Text>
			<Text color={textColor}>Beds: {room.bed_count}</Text>
			<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
				Base Rate: ${room.base_rate}
			</Text>

			<HStack spacing={2}>
				<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
				<IconButton
					icon={<DeleteIcon />}
					onClick={() => handleDeleteRoom(room._id)}
					colorScheme='red'
				/>
			</HStack>
			
		</Box>
	);
};

export default RoomCard;
