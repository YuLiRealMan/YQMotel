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
	FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";

const RoomCard = ({ room }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [numGuests, setNumGuests] = useState("");
	const [numPets, setNumPets] = useState("");
	const [numChildren, setNumChildren] = useState("");
	const [finalPrice, setFinalPrice] = useState("");
	const [hasCalculated, setHasCalculated] = useState(false);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const calculatePrice = () => {
		let total = room.base_rate;
		const guests = parseInt(numGuests) || 0;
		const pets = parseInt(numPets) || 0;
		const kids = parseInt(numChildren) || 0;

		if (guests > 2) {
			total += (guests - 2) * 10;
		}
		if (pets >= 1) {
			total += 10;
		}
		if (kids >= 1) {
			total += 5;
		}
		setFinalPrice(total);
		setHasCalculated(true);
	};

	const handleConfirm = () => {
		onClose();
		toast({
			title: "Selection Confirmed",
			description: `Name: ${name}, Phone: ${phone}, Guests: ${numGuests}, Pets: ${numPets}, Children: ${numChildren}, Price: $${finalPrice}`,
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};

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
				<Button onClick={onOpen} colorScheme='teal'>
					Select
				</Button>
			</HStack>

			<Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => setHasCalculated(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Guest Information</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4} align="stretch">
							<Box>
								<FormLabel>Name</FormLabel>
								<Input
									placeholder='Your full name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Box>
							<Box>
								<FormLabel>Phone Number</FormLabel>
								<Input
									placeholder='e.g., 204-123-4567'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</Box>
							<Box>
								<FormLabel>Number of Guests</FormLabel>
								<Input
									type='number'
									placeholder='e.g., 2'
									value={numGuests}
									onChange={(e) => setNumGuests(e.target.value)}
								/>
							</Box>
							<Box>
								<FormLabel>Number of Pets</FormLabel>
								<Input
									type='number'
									placeholder='e.g., 1'
									value={numPets}
									onChange={(e) => setNumPets(e.target.value)}
								/>
							</Box>
							<Box>
								<FormLabel>Number of Children</FormLabel>
								<Input
									type='number'
									placeholder='e.g., 0'
									value={numChildren}
									onChange={(e) => setNumChildren(e.target.value)}
								/>
							</Box>
							<Box>
								<FormLabel>Base Rate</FormLabel>
								<Input value={room.base_rate} isReadOnly />
							</Box>
							<Box>
								<FormLabel>Total Price</FormLabel>
								{hasCalculated && (
									<Input
										type='number'
										value={finalPrice}
										onChange={(e) => setFinalPrice(Number(e.target.value))}
									/>
								)}
							</Box>
							<Button colorScheme='green' onClick={calculatePrice}>
								Calculate Price
							</Button>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={handleConfirm}>
							Confirm
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default RoomCard;
